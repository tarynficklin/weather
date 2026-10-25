export default function CardStructure(props) {
  const {
    city,
    state,
    temp,
    condition,
    background,
    updateCity,
    updateState,
    editCard,
    deleteCard,
  } = props;

  return (
    <div id="card" style={{ backgroundImage: `url(${background})` }}>
      <div className="wrapper">
        <div className="top-div">
          <div className="temp-div">
            <p className="temp">{temp}°</p>
          </div>
          <div className="info-div">
            <div className="dual-div">
              <div className="location-div">
                <p className="location">
                  {city}, {state}
                </p>
              </div>
              <div className="delete-div">
                <button onClick={() => deleteCard()} className="delete-button button"></button>
              </div>
            </div>
            <div className="condition-div">
              <p className="condition">{condition}</p>
            </div>
          </div>
        </div>
        <div className="bottom-div">
          <input
            onChange={(e) => updateCity(e.target.value)}
            placeholder="City"
            className="city-input input"
          />
          <input
            onChange={(e) => updateState(e.target.value)}
            placeholder="State"
            className="state-input input"
          />
          <button onClick={() => editCard()} className="edit-button button"></button>
        </div>
      </div>
    </div>
  );
}
