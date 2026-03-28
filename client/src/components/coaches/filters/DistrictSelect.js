import { labelClass, selectClass } from "./selectStyles";

function DistrictSelect({ districts, value, onChange, disabled, id = "district" }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        District
      </label>
      <select
        id={id}
        className={selectClass}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All districts</option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DistrictSelect;
