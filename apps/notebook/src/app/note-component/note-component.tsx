import axios from 'axios';
import { useState } from 'react';
import { Note } from '../types/Note';
import styles from './note-component.module.css';
import { Notebook } from '../types/Notebook';
import dayjs from 'dayjs';

export interface NoteComponentProps {
  note: Note;
  notebook: Notebook;
  onEliminar(note: Note): void;
}

export function NoteComponent({
  note,
  onEliminar,
  notebook,
}: NoteComponentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const eliminar = () => {
    if (!window.confirm('Se borrará la observación de forma permanente')) {
      return;
    }
    setLoading(true);
    axios
      .delete(`/intervi/notebooks/${notebook.id}/notes/${note.id}`)
      .then(() => {
        setLoading(false);
        onEliminar(note);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  if (loading) return <p>procesando</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles['container']}>
      <div>
        <div style={{ float: 'right' }}>
          <button onClick={eliminar}>Eliminar</button>
        </div>
        {note.text}
      </div>
      <p>
        <em style={{ fontSize: 'small' }}>
          creado {dayjs(note.fecIng).format('DD/MM/YYYY HH:mm')} por{' '}
          {note.ingresadoPor}
        </em>
      </p>
    </div>
  );
}

export default NoteComponent;
