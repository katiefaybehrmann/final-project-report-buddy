import React, { useState } from "react";
import { Wrap, Button, Divider } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login({ loggingIn, setLoggingIn }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <Wrap>
            {showLogin ? (
                <>
                    <LoginForm loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
                    <Divider />
                    <p>
                        Don't have an account? &nbsp;
                        <Button onClick={() => setShowLogin(false)}>
                            Sign Up
                        </Button>
                    </p>
                </>
            ) : (
                <>
                    <SignUpForm loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
                    <Divider />
                    <p>
                        Already have an account? &nbsp;
                        <Button onClick={() => setShowLogin(true)}>
                            Log In
                        </Button>
                    </p>
                </>

            )}
        </Wrap>
    )
}

export default Login;