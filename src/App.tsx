import "./App.css";
import { TopBar, topBarList } from "./topbar/TobBar";
import { Body } from "./body/Body";
import { Route, Routes } from "react-router-dom";
import { FindMusic } from "./find_music/FindMusic";
import { LoginModalContext, useLoginModalContext } from "./user/phone_login/LoginModalContext";

function App() {

  return (
    <LoginModalContext.Provider value={useLoginModalContext()}>
      <Routes>
        <Route path="/*" element={<AppLayout />}>
          {topBarList.map((item, index) => (
            <Route path={item.link} element={item.component} key={index}></Route>
          ))}
          <Route path="*" element={<FindMusic />}></Route>
        </Route>
      </Routes>
    </LoginModalContext.Provider>
  );
}

function AppLayout() {
  return (
    <div className="app-root">
      <nav>
        <TopBar />
      </nav>
      <Body />
    </div>
  );
}

export default App;
