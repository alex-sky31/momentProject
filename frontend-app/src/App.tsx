import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/homePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LoginPage />}></Route>
        <Route path={"/home"} element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
