import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "./Context";
import { Button } from "@chakra-ui/react";
import Login from "./Login/Login";
import NavBar from "./NavBar";

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

  if (!user) return <Login loggingIn={loggingIn} setLoggingIn={setLoggingIn} />;


  return (
    <div>
      <p>placeholder</p>
      <Button>Chakra Button</Button>
    </div>
  );
}

export default App;
