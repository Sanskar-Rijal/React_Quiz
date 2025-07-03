//import { DateCounter } from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const initialstate = {
  questions: [],
  //we can be loading,error,ready,active,finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error(`Action Unknown`);
  }
}

export default function App() {
  //using useReducer hook for displaying question
  const [state, dispatch] = useReducer(reducer, initialstate);

  useEffect(function () {
    async function getQsn() {
      try {
        const response = await fetch(`http://localhost:8000/questions`);

        const data = await response.json();
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    getQsn();
  }, []);

  return (
    <div className="app">
      {/* <DateCounter /> for practice of useReducer hook*/}
      <Header />
      <Main />
    </div>
  );
}
