import { useState } from 'react';
import NoteComponent from '../note-component/note-component';
import { Notebook } from '../types/Notebook';
import styles from './notebook-component.module.css';
import { Note } from '../types/Note';
import CrearNota from '../crear-nota/crear-nota';

export interface NotebookComponentProps {
  notebook: Notebook;
  agregarNota: (nota: Note) => void;
  eliminarNota: (nota: Note) => void;
}

export function NotebookComponent({
  notebook,
  agregarNota,
  eliminarNota,
}: NotebookComponentProps) {
  const [creando, setCreando] = useState(false);

  function onCrear(nota: Note) {
    agregarNota(nota);
    setCreando(false);
  }

  return (
    <div className={styles['container']}>
      {notebook.notes.length === 0 && <p>No hay observaciones</p>}
      {notebook.notes.map((n) => (
        <NoteComponent note={n} onEliminar={eliminarNota} notebook={notebook} />
      ))}
      <button onClick={() => setCreando(true)}>Agregar observación</button>
      {creando && (
        <CrearNota
          onCrear={onCrear}
          onCancelar={() => setCreando(false)}
          notebook={notebook}
        />
      )}
    </div>
  );
}

export default NotebookComponent;
