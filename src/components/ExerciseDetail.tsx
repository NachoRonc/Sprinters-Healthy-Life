import { useState } from 'react';
import type { Exercise, Media } from '../types';

interface Props { exercise: Exercise; onAddMedia: (media: Omit<Media, 'id'>) => void }

function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

function MediaItem({ media }: { media: Media }) {
  if (media.type === 'image') return <img src={media.src} alt="Multimedia del ejercicio" />;
  const embed = youtubeEmbed(media.src);
  return embed
    ? <iframe src={embed} title="Vídeo del ejercicio" allowFullScreen />
    : <video src={media.src} controls />;
}

export default function ExerciseDetail({ exercise, onAddMedia }: Props) {
  const [url, setUrl] = useState('');
  const [kind, setKind] = useState<Media['type']>('image');
  const [error, setError] = useState('');

  const addUrl = () => {
    if (!/^https?:\/\//i.test(url.trim())) {
      setError('Introduce una URL válida que empiece por http:// o https://');
      return;
    }
    onAddMedia({ type: kind, src: url.trim() });
    setUrl(''); setError('');
  };

  const addFile = (file?: File) => {
    if (!file) return;
    const type = file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : null;
    if (!type) { setError('Solo se admiten imágenes o vídeos.'); return; }
    const reader = new FileReader();
    reader.onload = () => { onAddMedia({ type, src: reader.result as string }); setError(''); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="detail">
      <p className={`tags m-${exercise.muscle}`}>
        <span className="tag">{exercise.muscle}</span>
        <span className="tag outline">{exercise.level}</span>
      </p>
      <p className="desc">{exercise.description}</p>

      <h3>Multimedia</h3>
      {exercise.media.length === 0
        ? <p className="empty">Este ejercicio aún no tiene fotos ni vídeos. Añade el primero abajo.</p>
        : <div className="gallery">{exercise.media.map((m) => <MediaItem key={m.id} media={m} />)}</div>}

      <div className="media-form">
        <div className="row">
          <select value={kind} onChange={(e) => setKind(e.target.value as Media['type'])} aria-label="Tipo de multimedia">
            <option value="image">Imagen</option>
            <option value="video">Vídeo</option>
          </select>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… (imagen, mp4 o YouTube)" aria-label="URL" />
          <button className="btn primary" onClick={addUrl}>Añadir URL</button>
        </div>
        <label className="btn ghost file">
          Subir archivo desde tu dispositivo
          <input type="file" accept="image/*,video/*" onChange={(e) => { addFile(e.target.files?.[0]); e.target.value = ''; }} hidden />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
      </div>
    </div>
  );
}
