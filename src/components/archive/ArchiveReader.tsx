import { useState } from 'react';
import type { ArchiveFile } from '../../lib/api/archive';

interface Props {
  files: ArchiveFile[];
  title: string;
}

export function ArchiveReader({ files, title }: Props) {
  const [active, setActive] = useState<ArchiveFile | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  if (files.length === 0) return null;

  const pdfFiles = files.filter((f) => f.type === 'pdf');
  const imageFiles = files.filter((f) => f.type === 'image');
  const textFiles = files.filter((f) => f.type === 'text');

  const preferred = active ?? pdfFiles[0] ?? imageFiles[0] ?? textFiles[0] ?? files[0];

  return (
    <div className="archive-reader">
      <div className="archive-reader-tabs">
        {pdfFiles.length > 0 && (
          <button className={'reader-tab' + (preferred.type === 'pdf' ? ' active' : '')}
            onClick={() => setActive(pdfFiles[0])}>PDF</button>
        )}
        {imageFiles.length > 0 && (
          <button className={'reader-tab' + (preferred.type === 'image' ? ' active' : '')}
            onClick={() => { setActive(imageFiles[0]); setImgIndex(0); }}>Изображения ({imageFiles.length})</button>
        )}
        {textFiles.length > 0 && (
          <button className={'reader-tab' + (preferred.type === 'text' ? ' active' : '')}
            onClick={() => setActive(textFiles[0])}>Текст</button>
        )}
        <a href={preferred.url} target="_blank" rel="noopener noreferrer" className="reader-tab reader-tab--link">
          Скачать ↗
        </a>
      </div>

      <div className="archive-reader-body">
        {preferred.type === 'pdf' && (
          <iframe
            src={preferred.url}
            title={title}
            className="archive-reader-iframe"
          />
        )}

        {preferred.type === 'image' && (
          <div className="archive-reader-images">
            <img
              src={imageFiles[imgIndex]?.url}
              alt={`${title} — страница ${imgIndex + 1}`}
              className="archive-reader-img"
            />
            <div className="reader-nav">
              <button className="nav-btn" disabled={imgIndex === 0}
                onClick={() => setImgIndex((i) => i - 1)}>← Пред</button>
              <span className="page-counter">{imgIndex + 1} / {imageFiles.length}</span>
              <button className="nav-btn" disabled={imgIndex >= imageFiles.length - 1}
                onClick={() => setImgIndex((i) => i + 1)}>След →</button>
            </div>
          </div>
        )}

        {preferred.type === 'text' && (
          <div className="archive-reader-text">
            <p className="archive-reader-text-note">
              Текстовый файл доступен для скачивания. Откройте по ссылке выше.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
