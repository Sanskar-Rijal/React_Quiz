export default function Options({ currentQsn }) {
  return (
    <div className="options">
      {currentQsn.options.map((option) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}
