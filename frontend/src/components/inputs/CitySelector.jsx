export default function CitySelector(props) {
  return (
    <div>
      <input
        onChange={(e) => props.getCity(e.target.value)}
        placeholder="City"
        className="location-input"
      />
    </div>
  );
}
