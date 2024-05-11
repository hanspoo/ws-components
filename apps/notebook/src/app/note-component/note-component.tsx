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
        <div
          dangerouslySetInnerHTML={{
            __html: note.text.replace(/\n/g, '<br/>'),
          }}
        ></div>
      </div>
      <p style={{ marginTop: '1em' }}>
        <em style={{ fontSize: 'small' }}>
          Creado {dayjs(note.fecIng).format('DD/MM/YYYY HH:mm')} por{' '}
          {note.ingresadoPor}
        </em>{' '}
        <button className="btn btn-default btn-sm" onClick={eliminar}>
          Eliminar
        </button>
      </p>
    </div>
  );
}

export default NoteComponent;
