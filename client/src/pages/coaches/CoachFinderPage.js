import { useMemo, useState, useCallback } from "react";
import CoachFinderLayout from "../../components/coaches/CoachFinderLayout";
import CoachFilterPanel from "../../components/coaches/finder/CoachFilterPanel";
import ResultsHeader from "../../components/coaches/finder/ResultsHeader";
import FilterSummaryBar from "../../components/coaches/finder/FilterSummaryBar";
import CoachGrid from "../../components/coaches/finder/CoachGrid";
import EmptyState from "../../components/coaches/shared/EmptyState";
import { COACHES } from "../../data/coaches";
import { getAreasForDistrict, getDistrictsForProvince } from "../../data/locations";
import { filterCoaches } from "../../utils/filterCoaches";

const defaultFilters = {
  province: "",
  district: "",
  area: "",
  sport: "",
  sessionType: "",
  genderPref: "",
  experienceLevel: "",
  priceRange: "",
  availabilityDays: [],
  coachLevel: "",
};

function CoachFinderPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const districtOptions = useMemo(
    () => getDistrictsForProvince(filters.province),
    [filters.province]
  );

  const areaOptions = useMemo(() => getAreasForDistrict(filters.district), [filters.district]);

  const filtered = useMemo(() => filterCoaches(COACHES, filters), [filters]);

  const setFilter = useCallback((key, value) => {
    setFilters((f) => {
      const next = { ...f, [key]: value };
      if (key === "province") {
        next.district = "";
        next.area = "";
      }
      if (key === "district") {
        next.area = "";
      }
      return next;
    });
  }, []);

  const toggleDay = useCallback((day) => {
    setFilters((f) => {
      const has = f.availabilityDays.includes(day);
      return {
        ...f,
        availabilityDays: has ? f.availabilityDays.filter((d) => d !== day) : [...f.availabilityDays, day],
      };
    });
  }, []);

  const resetFilters = useCallback(() => setFilters(defaultFilters), []);

  const removeFilterKey = useCallback((key) => {
    if (key.startsWith("day:")) {
      const day = key.slice(4);
      toggleDay(day);
      return;
    }
    if (key === "province") setFilter("province", "");
    else if (key === "district") setFilter("district", "");
    else if (key === "area") setFilter("area", "");
    else if (key === "sport") setFilter("sport", "");
    else if (key === "sessionType") setFilter("sessionType", "");
    else if (key === "genderPref") setFilter("genderPref", "");
    else if (key === "experienceLevel") setFilter("experienceLevel", "");
    else if (key === "priceRange") setFilter("priceRange", "");
    else if (key === "coachLevel") setFilter("coachLevel", "");
  }, [setFilter, toggleDay]);

  const filterPanelProps = {
    province: filters.province,
    district: filters.district,
    area: filters.area,
    sport: filters.sport,
    sessionType: filters.sessionType,
    genderPref: filters.genderPref,
    experienceLevel: filters.experienceLevel,
    priceRange: filters.priceRange,
    availabilityDays: filters.availabilityDays,
    coachLevel: filters.coachLevel,
    districtOptions,
    areaOptions,
    onProvinceChange: (v) => setFilter("province", v),
    onDistrictChange: (v) => setFilter("district", v),
    onAreaChange: (v) => setFilter("area", v),
    onSportChange: (v) => setFilter("sport", v),
    onSessionTypeChange: (v) => setFilter("sessionType", v),
    onGenderChange: (v) => setFilter("genderPref", v),
    onExperienceChange: (v) => setFilter("experienceLevel", v),
    onPriceChange: (v) => setFilter("priceRange", v),
    onCoachLevelChange: (v) => setFilter("coachLevel", v),
    onToggleAvailabilityDay: toggleDay,
    onReset: resetFilters,
  };

  return (
    <CoachFinderLayout>
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-8 text-white shadow-sm sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-200/90">Coach finder</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Find coaches near your area</h1>
        <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-200">
          Book sports coaches by location across Sri Lanka. Select your province, district, and sport to discover
          trusted coaches for university and school athletes.
        </p>
      </section>

      <div className="mt-8 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-900 shadow-sm"
        >
          Filters & location
        </button>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-extrabold text-slate-900">Filters</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-extrabold text-slate-700"
              >
                Done
              </button>
            </div>
            <CoachFilterPanel {...filterPanelProps} />
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Filters</p>
              <h2 className="mt-1 text-lg font-extrabold text-slate-900">Refine results</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Province drives districts; districts drive areas.
              </p>
            </div>
            <CoachFilterPanel {...filterPanelProps} />
          </div>
        </aside>

        <div className="lg:col-span-8">
          <FilterSummaryBar filters={filters} onClearAll={resetFilters} onRemove={removeFilterKey} />
          <ResultsHeader count={filtered.length} />
          {filtered.length === 0 ? (
            <EmptyState
              title="No coaches found in this area"
              description="Try changing district, sport, or clearing availability filters."
              action={
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm"
                >
                  Reset filters
                </button>
              }
            />
          ) : (
            <CoachGrid coaches={filtered} />
          )}
        </div>
      </div>
    </CoachFinderLayout>
  );
}

export default CoachFinderPage;
