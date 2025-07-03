import Options from "./options";
export default function Questions({ currentQsn }) {
  return (
    <div>
      <h2>{currentQsn.question}</h2>
      <Options currentQsn={currentQsn} />
    </div>
  );
}
