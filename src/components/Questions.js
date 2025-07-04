import Options from "./options";
export default function Questions({ currentQsn, dispatch, answer }) {
  return (
    <div>
      <h2>{currentQsn.question}</h2>
      <Options currentQsn={currentQsn} dispatch={dispatch} answer={answer} />
    </div>
  );
}
