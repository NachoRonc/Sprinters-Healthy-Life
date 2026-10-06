export type Level = 'Principiante' | 'Intermedio' | 'Avanzado';

export const MUSCLES = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core'] as const;
export type Muscle = (typeof MUSCLES)[number];
export const LEVELS: Level[] = ['Principiante', 'Intermedio', 'Avanzado'];

export interface Media {
  id: string;
  type: 'image' | 'video';
  src: string; // URL externa o data URL (archivo subido)
}

export interface Exercise {
  id: string;
  name: string;
  muscle: Muscle;
  level: Level;
  description: string;
  media: Media[];
}
