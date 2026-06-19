type Source = 'comic_vine' | 'archive' | 'xkcd';

const labels: Record<Source, string> = {
  comic_vine: 'Comic Vine',
  archive: 'Archive',
  xkcd: 'xkcd',
};

export function SourceBadge({ source }: { source: Source }) {
  return (
    <span className={`source-badge source-badge--${source.replace('_', '-')}`}>
      {labels[source]}
    </span>
  );
}
