import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context";
import Login from "./SignInFlow/Login";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CourseList from "./CoursePages/CourseList";

function App() {
  const { user, setUser } = useContext(UserContext)
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [loggingIn]);


  return (
    <div>
      <NavBar />
      {!user ? (
        <main>
          <Login loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
        </main>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/courses" element={<CourseList />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
