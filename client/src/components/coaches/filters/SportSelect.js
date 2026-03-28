import { SPORTS } from "../../../data/coachConstants";
import { labelClass, selectClass } from "./selectStyles";

function SportSelect({ value, onChange, id = "sport" }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        Sport
      </label>
      <select id={id} className={selectClass} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All sports</option>
        {SPORTS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SportSelect;
