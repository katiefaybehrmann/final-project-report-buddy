import React, { useState, useContext } from "react";
import { Flex, Stack, Heading } from "@chakra-ui/react";
import { FormField, Input, Label, Error, StyledButton } from "../styling/styled-components";
import { UserContext } from "../Context";

function AddCourse({ setShowAddCourseForm }) {
    const { user, setUser } = useContext(UserContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/courses', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "description": description
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((c) => {
                            console.log(c)
                            handleAddCourse(c)
                            clearForm();
                            setShowAddCourseForm(false)
                        })
                }
                else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    const handleAddCourse = (newCourse) => {
        const updatedCourses = [...user.courses, newCourse]
        const updatedUser = { ...user, courses: updatedCourses }
        setUser(updatedUser)
      }

    const clearForm = () => {
        setName("")
        setDescription("")
    }


    return (
        <Stack direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontFamily={"Karla Normal"} fontSize={'2xl'}>Add a Course</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="name">Course Name</Label>
                            <Input
                                type="text"
                                id="name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="description">Course Description</Label>
                            <Input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <StyledButton type="submit">
                                Add Course
                            </StyledButton>
                        </FormField>
                        <FormField>
                            {errors.map((err) => (
                                <Error key={err}>{err}</Error>
                            ))
                            }
                        </FormField>
                    </form>
                </Stack>
            </Flex>
        </Stack>
    )
}

export default AddCourse;