import { classForMime, formatBytes } from '@starter-ws/shared';

type FileDetailProps = {
  file: any;
  setSelArchivo: (sel: boolean) => void;
  bingo: boolean;
};
export function FileDetail({ file, setSelArchivo, bingo }: FileDetailProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <i
        aria-hidden="true"
        style={{ fontSize: '48px', marginRight: '7px' }}
        className={`fa ${classForMime(file.type)}`}
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
          <div style={{ fontSize: '10px', padding: '2px', color: 'green' }}>
            Archivo subido correctamente
          </div>
        )}
      </div>
    </div>
  );
}
