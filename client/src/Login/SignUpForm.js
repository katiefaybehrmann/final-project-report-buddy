import React, { useState, useContext } from "react";
import { UserContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { Label, Button, Error, Input, FormField } from "../styling/styled-components";
import {
    Flex,
    Heading,
    Stack,
    Image,
} from '@chakra-ui/react';

function SignUpForm({ loggingIn, setLoggingIn }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
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
                    <Heading fontSize={'2xl'}>Sign Up</Heading>
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="password">Password Confirmation</Label>
                            <Input
                                type="password"
                                id="password_confirmation"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                autoComplete="current-password"
                            />
                        </FormField>
                        <Stack spacing={6}>
                            <FormField>
                                <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
                            </FormField>
                        </Stack>
                        <FormField>
                            {errors.map((err) => (
                                <Error key={err}>{err}</Error>
                            ))}
                        </FormField>
                    </form>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack>
    )
}

export default SignUpForm;