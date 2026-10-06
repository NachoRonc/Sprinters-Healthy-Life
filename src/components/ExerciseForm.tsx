import { useState, type FormEvent } from 'react';
import { LEVELS, MUSCLES, type Exercise, type Level, type Muscle } from '../types';

interface Props { onSave: (e: Omit<Exercise, 'id' | 'media'>) => void }

export default function ExerciseForm({ onSave }: Props) {
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState<Muscle>(MUSCLES[0]);
  const [level, setLevel] = useState<Level>('Principiante');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError('Escribe un nombre y una descripción para guardar el ejercicio.');
      return;
    }
    onSave({ name: name.trim(), muscle, level, description: description.trim() });
  };

  return (
    <form className="form" onSubmit={submit}>
      <label>Nombre
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Remo con barra" autoFocus />
      </label>
      <div className="row">
        <label>Grupo muscular
          <select value={muscle} onChange={(e) => setMuscle(e.target.value as Muscle)}>
            {MUSCLES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <label>Nivel
          <select value={level} onChange={(e) => setLevel(e.target.value as Level)}>
            {LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
      </div>
      <label>Descripción
        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Cómo se ejecuta el ejercicio" />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn primary" type="submit">Guardar ejercicio</button>
    </form>
  );
}
