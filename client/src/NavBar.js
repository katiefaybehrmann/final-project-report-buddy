import React, {useContext} from "react";
import { UserContext } from "./Context";
import { Link } from "react-router-dom";

function NavBar(){
    const {user, setUser} = useContext(UserContext)

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
    return(
        <div>
            <p>navbar stuff</p>
        </div>
    )
}

export default NavBar;