type Source = 'comic_vine' | 'archive';

const NOTICES: Record<Source, { text: string; href: string; linkText: string }> = {
  comic_vine: {
    text: 'Метаданные предоставлены',
    href: 'https://comicvine.gamespot.com',
    linkText: 'Comic Vine',
  },
  archive: {
    text: 'Источник: ',
    href: 'https://archive.org',
    linkText: 'Internet Archive',
  },
};

const NOTES: Record<Source, string> = {
  comic_vine: 'Comic Vine предоставляет только метаданные. Полные страницы комиксов недоступны.',
  archive: 'Отображаются только публично доступные файлы. Некоторые материалы могут быть недоступны для чтения.',
};

export function LegalNotice({ source }: { source: Source }) {
  const n = NOTICES[source];
  return (
    <div className="legal-notice">
      <span>{n.text} </span>
      <a href={n.href} target="_blank" rel="noopener noreferrer">{n.linkText}</a>.{' '}
      <span className="legal-notice-sub">{NOTES[source]}</span>
    </div>
  );
}
