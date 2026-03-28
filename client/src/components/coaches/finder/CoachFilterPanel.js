import ProvinceSelect from "../filters/ProvinceSelect";
import DistrictSelect from "../filters/DistrictSelect";
import AreaSelect from "../filters/AreaSelect";
import SportSelect from "../filters/SportSelect";
import FilterChip from "../shared/FilterChip";
import {
  SESSION_TYPE_OPTIONS,
  GENDER_FILTER_OPTIONS,
  EXPERIENCE_FILTER_OPTIONS,
  PRICE_FILTER_OPTIONS,
  AVAILABILITY_DAYS,
  COACH_LEVEL_OPTIONS,
} from "../../../data/coachConstants";
import { labelClass, selectClass } from "../filters/selectStyles";

function CoachFilterPanel({
  province,
  district,
  area,
  sport,
  sessionType,
  genderPref,
  experienceLevel,
  priceRange,
  availabilityDays,
  coachLevel,
  districtOptions,
  areaOptions,
  onProvinceChange,
  onDistrictChange,
  onAreaChange,
  onSportChange,
  onSessionTypeChange,
  onGenderChange,
  onExperienceChange,
  onPriceChange,
  onCoachLevelChange,
  onToggleAvailabilityDay,
  onReset,
}) {
  const toggleDay = (day) => {
    onToggleAvailabilityDay(day);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <ProvinceSelect value={province} onChange={onProvinceChange} />
        <DistrictSelect
          districts={districtOptions}
          value={district}
          onChange={onDistrictChange}
          disabled={!province}
        />
      </div>
      <AreaSelect areas={areaOptions} value={area} onChange={onAreaChange} disabled={!district} />
      <SportSelect value={sport} onChange={onSportChange} />

      <div>
        <label className={labelClass}>Coach focus</label>
        <select
          className={selectClass}
          value={coachLevel}
          onChange={(e) => onCoachLevelChange(e.target.value)}
        >
          {COACH_LEVEL_OPTIONS.map((o) => (
            <option key={o.value || "all"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Session type</label>
        <select
          className={selectClass}
          value={sessionType}
          onChange={(e) => onSessionTypeChange(e.target.value)}
        >
          <option value="">Any session type</option>
          {SESSION_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Gender preference</label>
        <select
          className={selectClass}
          value={genderPref}
          onChange={(e) => onGenderChange(e.target.value)}
        >
          {GENDER_FILTER_OPTIONS.map((o) => (
            <option key={o.value || "any"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Experience</label>
          <select
            className={selectClass}
            value={experienceLevel}
            onChange={(e) => onExperienceChange(e.target.value)}
          >
            {EXPERIENCE_FILTER_OPTIONS.map((o) => (
              <option key={o.value || "any"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Price range</label>
          <select
            className={selectClass}
            value={priceRange}
            onChange={(e) => onPriceChange(e.target.value)}
          >
            {PRICE_FILTER_OPTIONS.map((o) => (
              <option key={o.value || "any"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className={labelClass}>Availability (match any selected day)</p>
        <div className="flex flex-wrap gap-2">
          {AVAILABILITY_DAYS.map((day) => (
            <FilterChip
              key={day}
              active={availabilityDays.includes(day)}
              onClick={() => toggleDay(day)}
            >
              {day.slice(0, 3)}
            </FilterChip>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
      >
        Reset filters
      </button>
    </div>
  );
}

export default CoachFilterPanel;
