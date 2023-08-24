import { classForMime, formatBytes } from '@starter-ws/shared';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

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

function FileUploadSingle({ campoId }: FileUploadSingleProps) {
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <i
          aria-hidden="true"
          style={{ fontSize: '48px', marginRight: '7px' }}
          className={`fa-solid ${classForMime(file.type)}`}
        ></i>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <div>
            {file.name}
            <span
              style={{ marginLeft: '1em', cursor: 'pointer', color: 'orange' }}
              title="Editar"
              onClick={() => setSelArchivo(true)}
              aria-hidden="true"
              className="glyphicon glyphicon-edit"
            ></span>
            <div>
              <small>{formatBytes(file.size)}</small>
            </div>
          </div>
          {bingo && (
            <em>
              <small style={{ color: '#666' }}>
                <span
                  aria-hidden="true"
                  className="glyphicon glyphicon-info-sign"
                ></span>{' '}
                Archivo subido correctamente
              </small>
            </em>
          )}
        </div>
      </div>
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
