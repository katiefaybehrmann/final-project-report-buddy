import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context";
import Login from "./Login/Login";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

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
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
