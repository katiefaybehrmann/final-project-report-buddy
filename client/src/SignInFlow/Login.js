import React, { useState } from "react";
import { Wrap, Divider } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { StyledButton } from "../styling/styled-components";

function Login({ loggingIn, setLoggingIn }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <Wrap padding="16px">
            {showLogin ? (
                <>
                    <LoginForm loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
                    <Divider />
                    <p>
                        Don't have an account? &nbsp;
                        <StyledButton color="secondary" onClick={() => setShowLogin(false)}>
                            Sign Up
                        </StyledButton>
                    </p>
                </>
            ) : (
                <>
                    <SignUpForm loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
                    <Divider />
                    <p>
                        Already have an account? &nbsp;
                        <StyledButton color="secondary" onClick={() => setShowLogin(true)}>
                            Log In
                        </StyledButton>
                    </p>
                </>

            )}
        </Wrap>
    )
}

export default Login;