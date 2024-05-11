import { useEffect, useState } from 'react';

import axios from 'axios';

import NotebookComponent from './notebook-component/notebook-component';
import { Notebook } from './types/Notebook';
import { Note } from './types/Note';

/* eslint-disable-next-line */
export interface NotebookContainerProps {
  notebookId: number;
}

export function NotebookContainer({ notebookId }: NotebookContainerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<Notebook>();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/intervi/notebooks/${notebookId}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>procesando...</p>;
  if (error) return <p>{error}</p>;

  if (!data) return <p>Error interno</p>;

  const agregarNota = (nota: Note) => {
    const notes = data.notes.concat(nota);
    setData({ ...data, notes });
  };

  const eliminarNota = (nota: Note) => {
    const notes = data.notes.filter((n) => n.id !== nota.id);
    setData({ ...data, notes });
  };

  return (
    <NotebookComponent
      notebook={data}
      agregarNota={agregarNota}
      eliminarNota={eliminarNota}
    />
  );
}
