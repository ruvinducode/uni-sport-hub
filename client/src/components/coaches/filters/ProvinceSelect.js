import { PROVINCES } from "../../../data/locations";
import { labelClass, selectClass } from "./selectStyles";

function ProvinceSelect({ value, onChange, id = "province" }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        Province
      </label>
      <select id={id} className={selectClass} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All provinces</option>
        {PROVINCES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProvinceSelect;
