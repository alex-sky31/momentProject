import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<div> Loading</div>}></Route>
        <Route path={"/home"} element={<div> test </div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
