import React, {useContext, useState} from "react";
import { UserContext } from "../Context";
import { Flex, Stack, Heading } from "@chakra-ui/react";
import { FormField, Input, Label, Error, StyledButton } from "../styling/styled-components";

function AddCompCat({setShowAddCompetencyForm, displayedCourse}){
    const { user, setUser } = useContext(UserContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/competency_categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "course_id": displayedCourse.id
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((cc) => {
                            console.log(cc)
                            handleAddCompCat(cc)
                            clearForm();
                            setShowAddCompetencyForm(false)
                        })
                }
                else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    const handleAddCompCat = (newCompCat) => {
        const updatedCC = [...displayedCourse.competency_categories, newCompCat]
        const updatedCourse = {...displayedCourse, competency_categories: updatedCC}
        const updatedCourses = user.courses.map(c => c.id == updatedCourse.id ? updatedCourse : c)
        const updatedUser = { ...user, courses: updatedCourses }
        setUser(updatedUser)
      }

    const clearForm = () => {
        setName("")
        setDescription("")
    }

    return(
        <Stack direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontFamily={"Karla Normal"} fontSize={'2xl'}>Add a Competency</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="name">Competency Name</Label>
                            <Input
                                type="text"
                                id="name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="description">Description</Label>
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
                        {/* <FormField>
                            {errors.map((err) => (
                                <Error key={err}>{err}</Error>
                            ))
                            }
                        </FormField> */}
                    </form>
                </Stack>
            </Flex>
        </Stack>
    )
}

export default AddCompCat;