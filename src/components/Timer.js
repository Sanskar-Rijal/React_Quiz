import { useEffect } from "react";

export default function Timer({ dispatch, secondRemaining }) {
  //seperating minute and seconds
  const minutes = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  //we want to run timer when this component mounts so we use useEffect here
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id); //clean up function to clear the interval
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minutes < 10 ? "0" : ""}
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}
