import { Note } from './Note';

export interface Notebook {
  id: number;
  notes: Note[];
  fecIng: number;
  ingresadoPor: string;
}
