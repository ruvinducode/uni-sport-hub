import { SESSION_TYPE_OPTIONS } from "../../../data/coachConstants";

export function sessionTypeLabel(value) {
  return SESSION_TYPE_OPTIONS.find((o) => o.value === value)?.label || value;
}
