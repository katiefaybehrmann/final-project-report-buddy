import React, { useState, useContext } from "react";
import { UserContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { StyledButton, Error, Input, FormField, Label } from "../styling/styled-components";
import {
    // Button,
    Flex,
    //     FormControl,
    //     FormLabel,
    Heading,
    //     Input,
    Stack,
    Image,
} from '@chakra-ui/react';

import reportBuddyLogin from '../styling/assets/reportBuddyLogin.png'

function LoginForm({ loggingIn, setLoggingIn }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => {
                    navigate("/")
                    setUser(user)
                    return setLoggingIn(loggingIn => !loggingIn)
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (

        <Stack minH={'40vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontFamily={"Karla Normal"} fontSize={'2xl'}>Log in to your account</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormField>
                        <Stack spacing={6}>
                            <FormField>
                                <StyledButton type="submit">
                                    {isLoading ? "Loading..." : "Login"}
                                </StyledButton>
                            </FormField>
                        </Stack >
                        <FormField>
                            {errors}
                            {
                                errors.map((err) => (
                                    <Error key={err}>{err}</Error>
                                ))
                            }
                        </FormField>
                    </form>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        reportBuddyLogin
                    }
                />
            </Flex>
        </Stack>
    )
}

export default LoginForm;