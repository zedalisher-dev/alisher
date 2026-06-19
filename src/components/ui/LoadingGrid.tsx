export function LoadingGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="comic-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-cover" />
          <div className="skeleton-info">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line skeleton-line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}
