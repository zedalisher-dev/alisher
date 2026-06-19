interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, placeholder = 'Поиск…', autoFocus }: Props) {
  return (
    <div className="search-wrapper">
      <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="m14 14 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
    </div>
  );
}
