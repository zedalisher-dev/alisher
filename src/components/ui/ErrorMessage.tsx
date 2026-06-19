interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="error-state">
      <p className="error-state-icon">⚠️</p>
      <p className="error-state-text">{message}</p>
      {onRetry && (
        <button className="btn-primary" onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
}
