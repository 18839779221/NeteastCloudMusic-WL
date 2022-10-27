import { Outlet, Route, Routes } from "react-router-dom";
import { MyMusic } from "../my_music/MyMusic";
import { SecondBar, secondBarList } from "./second_bar/SecondBar";

export function FindMusic() {
  return (
    <Routes>
      <Route path="" element={<FindMusicLayout />}>
        {secondBarList.map((item, index) => (
          <Route path={item.link} element={item.component} key={index}></Route>
        ))}
        <Route path="*" element={<MyMusic />}></Route>
      </Route>
    </Routes>
  );
}

function FindMusicLayout() {
  return (
    <div>
      <nav>
        <SecondBar />
      </nav>
      <Outlet />
    </div>
  );
}
