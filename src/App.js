//import { DateCounter } from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./context/QuizContext";

export default function App() {
  //using ContextApi for global State management
  const { status } = useQuiz();
  console.log(useQuiz());

  return (
    <div className="app">
      {/* <DateCounter /> for practice of useReducer hook*/}
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />

            <Questions />

            <Footer>
              <Timer />

              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && <Finish />}
      </Main>
    </div>
  );
}
