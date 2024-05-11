import { useState } from 'react';
import { Note } from '../types/Note';
import styles from './crear-nota.module.css';
import axios from 'axios';
import { Notebook } from '../types/Notebook';

/* eslint-disable-next-line */
export interface CrearNotaProps {
  onCrear(nota: Note): void;
  notebook: Notebook;
  onCancelar: () => void;
}

export function CrearNota({ notebook, onCrear, onCancelar }: CrearNotaProps) {
  const [text, setText] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function crearNota() {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('text', text);
    axios
      .post(`/intervi/notebooks/${notebook.id}`, params)
      .then((response) => {
        setLoading(false);
        onCrear(response.data);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  if (loading) return <p>enviando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles['container']}>
      <h4>Agregando observaciones</h4>
      <textarea
        rows={8}
        cols={100}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div style={{ margin: '1em 0' }}>
        <button onClick={onCancelar}>Cancelar</button>
        <button
          className="btn btn-primary"
          disabled={text?.length < 4}
          onClick={crearNota}
        >
          Crear
        </button>
      </div>
    </div>
  );
}

export default CrearNota;
