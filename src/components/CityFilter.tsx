type CityFilterProps = {
  cities: string[];
  value: string; // "" significa "todas as cidades"
  onChange: (city: string) => void;
};

export function CityFilter({ cities, value, onChange }: CityFilterProps) {
  return (
    <label className="city-filter">
      Cidade
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Todas</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </label>
  );
}
