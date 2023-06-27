import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Home from "./header/home/Home";
import Diaries from "./diaries/Diaries";
import Auth from "./auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./profile/Profile";
import Add from "./diaries/Add";
import DiaryUpdate from "./diaries/DiaryUpdate";
import { useEffect } from "react";
import { authActions } from "./store";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diaries" element={<Diaries />} />
          <Route path="/auth" element={<Auth />} />
          {isLoggedIn && (
            <>
              <Route path="/add" element={<Add />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<DiaryUpdate />} />
            </>
          )}
        </Routes>
      </section>
      <Toaster />
    </div>
  );
}

export default App;
