export default function Progress({
  index,
  numQsn,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQsn} value={index + Number(answer !== null)} />
      {/* if answer is null then it will be false,Number will convert it into 0 , and when it's true it will add 1 */}

      <p>
        Question <strong>{index + 1}</strong>/{numQsn}{" "}
      </p>
      <p>
        Points:
        <strong>
          {points}/{totalPoints}
        </strong>
      </p>
    </header>
  );
}
