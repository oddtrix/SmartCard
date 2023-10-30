import "./App.css";
import Main from "./components/layout/Main";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="dark:bg-black">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
