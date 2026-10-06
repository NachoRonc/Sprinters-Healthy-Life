import { useEffect, useMemo, useState } from 'react';
import { initialExercises } from './data';
import type { Exercise, Media } from './types';
import ExerciseCard from './components/ExerciseCard';
import ExerciseForm from './components/ExerciseForm';
import ExerciseDetail from './components/ExerciseDetail';
import Modal from './components/Modal';

const KEY = 'exercises-v1';
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const uid = () => Math.random().toString(36).slice(2, 10);

function load(): Exercise[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Exercise[]) : initialExercises;
  } catch { return initialExercises; }
}

export default function App() {
  const [exercises, setExercises] = useState<Exercise[]>(load);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(exercises)); } catch { /* cuota llena */ }
  }, [exercises]);

  // HU5: búsqueda por nombre (sin distinguir mayúsculas ni tildes)
  const visible = useMemo(
    () => exercises.filter((e) => norm(e.name).includes(norm(query.trim()))),
    [exercises, query]
  );
  const selected = exercises.find((e) => e.id === selectedId) ?? null;

  // HU2
  const addExercise = (data: Omit<Exercise, 'id' | 'media'>) => {
    setExercises((prev) => [{ ...data, id: uid(), media: [] }, ...prev]);
    setAdding(false);
  };

  // HU3
  const addMedia = (media: Omit<Media, 'id'>) =>
    setExercises((prev) =>
      prev.map((e) => (e.id === selectedId ? { ...e, media: [...e.media, { ...media, id: uid() }] } : e))
    );

  return (
    <div className="page">
      <header className="top">
        <h1>Catálogo de ejercicios</h1>
        <button className="btn primary" onClick={() => setAdding(true)}>Añadir ejercicio</button>
      </header>

      <div className="search">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ejercicio por nombre" aria-label="Buscar ejercicio por nombre" />
        <span>{visible.length} de {exercises.length}</span>
      </div>

      {/* HU1 */}
      {visible.length === 0 ? (
        <p className="empty">Ningún ejercicio se llama «{query}». Prueba con otro nombre o añádelo al catálogo.</p>
      ) : (
        <main className="grid">
          {visible.map((e) => <ExerciseCard key={e.id} exercise={e} onOpen={setSelectedId} />)}
        </main>
      )}

      {adding && <Modal title="Nuevo ejercicio" onClose={() => setAdding(false)}><ExerciseForm onSave={addExercise} /></Modal>}
      {/* HU4 */}
      {selected && (
        <Modal title={selected.name} onClose={() => setSelectedId(null)}>
          <ExerciseDetail exercise={selected} onAddMedia={addMedia} />
        </Modal>
      )}
    </div>
  );
}
