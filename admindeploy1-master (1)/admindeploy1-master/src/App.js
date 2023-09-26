import Home from "./pages/home/Home";

import List from "./pages/list/List";
import List2 from "./pages/list2/List2";
import Single from "./pages/single/Single";
import Single2 from "./pages/single2/Single2";
import Queries from "./pages/Queries/Queries";
import Login from "./pages/login/Login";


import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AdminLogin from "./pages/adminLogin/AdminLogin";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<AdminLogin />}/>
            <Route exact path="/home" element={<Home />} />
            <Route path="/users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New inputs={userInputs} title="Add New User" />}/>
            </Route>
            <Route path="/products">
              <Route index element={<List2 />} />
              <Route path=":productId" element={<Single2 />} />
              <Route path="new" element={<New inputs={productInputs} title="Add New Product" />}/>
            </Route>
            <Route path = "/queries">
              <Route index element = {<Queries/>}/>
            </Route>

        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </div>
  );
}

export default App;
