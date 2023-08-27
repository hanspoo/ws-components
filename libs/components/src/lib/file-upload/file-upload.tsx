import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { FileDetail } from './FileDetail';

type FileUploadSingleProps = {
  campoId: string;
};

interface RespuestaAgregarArchivo {
  id: number;
  length: number;
  nombre: string;
  descripcion: string;
  webDoc: WebDoc;
}

interface WebDoc {
  nombre: string;
  url: string;
  archivoId: number;
  size: number;
  ctime: number;
  mtime: number;
}

export function FileUploadSingle({ campoId }: FileUploadSingleProps) {
  const [bingo, setBingo] = useState(false);
  const [file, setFile] = useState<File>();
  const [selArchivo, setSelArchivo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    setFile(file);

    axios
      .post<RespuestaAgregarArchivo>('/intervi/archivos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        const res: RespuestaAgregarArchivo = response.data;
        const ele = document.getElementById(campoId) as any as HTMLInputElement;
        ele.value = res.id + '';
        setBingo(true);
        setTimeout(() => setBingo(false), 7000);
        setTimeout(() => {
          setLoading(false);
          setSelArchivo(false);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setTimeout(() => {
          setLoading(false);
          setSelArchivo(false);
        }, 3000);
      });
  };

  if (selArchivo)
    return (
      <div>
        <input
          style={{ marginBottom: '.5em' }}
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
        {loading ? (
          <div style={{ margin: '1em 0' }}>
            <i className="fas fa-circle-notch fa-spin"></i>
            <small style={{ marginLeft: '.25em' }}>Subiendo archivo...</small>
          </div>
        ) : (
          <button
            className="btn btn-default btn-sm"
            onClick={() => setSelArchivo(false)}
          >
            <span
              aria-hidden="true"
              className="glyphicon glyphicon-remove"
            ></span>{' '}
            Cancelar
          </button>
        )}
      </div>
    );

  if (file)
    return (
      <FileDetail file={file} setSelArchivo={setSelArchivo} bingo={bingo} />
    );

  return (
    <button
      type="button"
      className="btn btn-default"
      onClick={() => setSelArchivo(true)}
    >
      <span aria-hidden="true" className="glyphicon glyphicon-file"></span>{' '}
      Subir archivo
    </button>
  );
}

export default FileUploadSingle;
