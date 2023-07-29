import React, { useContext } from "react";
import { UserContext } from "./Context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledButton } from "./styling/styled-components";
import logo from "./styling/assets/logo.svg"

function NavBar() {
    const { setUser } = useContext(UserContext)

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }
    return (
        <Wrapper>
            <StyledButton color="third" as={Link} to="/">
                <img src={logo} alt="Report Buddy Logo"/>
            </StyledButton>
            <StyledButton color="third" as={Link} to="/courses">
                View Courses
            </StyledButton>
            <StyledButton color="third" as={Link} to="/about">
                About
            </StyledButton>
            <StyledButton color="third" onClick={handleLogoutClick}>
                Logout
            </StyledButton>
        </Wrapper>
    )
}

const Wrapper = styled.header`
display: flex;
padding: 10px 16px;
justify-content: space-between;
align-items: center;
background: var(--gradient-blue-to-green, linear-gradient(90deg, #3F5B6C 0%, #9AB4A8 100%));
`;

export default NavBar;