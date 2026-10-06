import type { Exercise } from './types';

export const initialExercises: Exercise[] = [
  { id: '1', name: 'Press de banca', muscle: 'Pecho', level: 'Intermedio', media: [],
    description: 'Tumbado en el banco, baja la barra hasta rozar el pecho y empuja hasta extender los codos. Mantén los pies firmes y los omóplatos juntos.' },
  { id: '2', name: 'Sentadilla con barra', muscle: 'Piernas', level: 'Intermedio', media: [],
    description: 'Con la barra sobre los trapecios, baja flexionando cadera y rodillas hasta que los muslos queden paralelos al suelo y sube empujando con los talones.' },
  { id: '3', name: 'Peso muerto', muscle: 'Espalda', level: 'Avanzado', media: [],
    description: 'Con la espalda neutra, levanta la barra del suelo extendiendo cadera y rodillas a la vez. Mantén la barra pegada a las piernas.' },
  { id: '4', name: 'Dominadas', muscle: 'Espalda', level: 'Avanzado', media: [],
    description: 'Cuélgate de la barra con agarre prono y sube hasta que la barbilla la supere. Baja con control sin balancearte.' },
  { id: '5', name: 'Press militar', muscle: 'Hombros', level: 'Intermedio', media: [],
    description: 'De pie, empuja la barra desde los hombros hasta estirar los brazos sobre la cabeza, con el abdomen firme.' },
  { id: '6', name: 'Plancha', muscle: 'Core', level: 'Principiante', media: [],
    description: 'Apoyado en antebrazos y puntas de los pies, mantén el cuerpo en línea recta sin hundir la cadera. Empieza con 20-30 segundos.' },
  { id: '7', name: 'Curl de bíceps', muscle: 'Brazos', level: 'Principiante', media: [],
    description: 'De pie con mancuernas, flexiona los codos llevando el peso hacia los hombros sin mover los codos del costado.' },
];
