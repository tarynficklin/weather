import states from './states';

export default function StateSelector(props) {
    return (
      <div>
        <select onChange={(e)=>props.getState(e.target.value)} defaultValue="" className="location-input">
            <option value="" disabled>State</option>
            {states.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
      </div>
    )
}
