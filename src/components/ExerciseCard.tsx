import type { Exercise } from '../types';

interface Props { exercise: Exercise; onOpen: (id: string) => void }

export default function ExerciseCard({ exercise, onOpen }: Props) {
  const cover = exercise.media.find((m) => m.type === 'image');
  return (
    <button className={`card m-${exercise.muscle}`} onClick={() => onOpen(exercise.id)}>
      <div className="cover">
        {cover ? <img src={cover.src} alt={exercise.name} /> : <span>{exercise.name.charAt(0)}</span>}
      </div>
      <div className="card-body">
        <h3>{exercise.name}</h3>
        <p className="meta">{exercise.muscle}, {exercise.level.toLowerCase()}</p>
      </div>
    </button>
  );
}
