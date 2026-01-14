export default function FloorNav({ floors, activeFloor, onFloorChange }) {
  return (
    <div className="floor-nav">
      <button
        className={`floor-nav__item ${!activeFloor ? "floor-nav__item--active" : ""}`}
        onClick={() => onFloorChange(null)}
      >
        <span className="floor-nav__number">All</span>
        <span className="floor-nav__name">Floors</span>
      </button>
      
      {floors.map((floor) => (
        <button
          key={floor._id}
          className={`floor-nav__item ${activeFloor === floor._id ? "floor-nav__item--active" : ""}`}
          onClick={() => onFloorChange(floor._id)}
        >
          <span className="floor-nav__number">{floor.number}</span>
          <span className="floor-nav__name">{floor.name}</span>
        </button>
      ))}
    </div>
  );
}
