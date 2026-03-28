import { labelClass, selectClass } from "./selectStyles";

function AreaSelect({ areas, value, onChange, disabled, id = "area" }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        Area / City
      </label>
      <select
        id={id}
        className={selectClass}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Any area</option>
        {areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AreaSelect;
