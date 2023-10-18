import { Route } from "react-router-dom";
import "./App.css";
import CardContainer from "./components/dictionary/CardContainer";
import Main from "./components/layout/Main";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export default App;
