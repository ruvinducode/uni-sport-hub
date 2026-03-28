function SearchBar({ value, onChange, placeholder = "Search teams or league…", id = "scoreboard-search" }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        Search
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none ring-emerald-500/20 focus:border-emerald-500 focus:ring-2"
      />
    </div>
  );
}

export default SearchBar;
