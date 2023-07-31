import React, { useState } from "react";
import { Flex, Stack, Heading, Radio, RadioGroup, Button } from "@chakra-ui/react";
import { FormField, Input, Label, Error, StyledButton } from "../styling/styled-components";


function AddStudent({ setShowAddStudentForm, displayedCourse, reports, setReports }) {
    const [name, setName] = useState("")
    const [pronouns, setPronouns] = useState("")
    const [errors, setErrors] = useState([]);

    // const [existingStudentID, setExistingStudentID] = useState(null)
    // const [existingStudentName, setExistingStudentName] = useState("")
    // const otherReports = reports.filter(r => r.course_id != displayedCourse.id)
    // const otherStudents = otherReports.map(r => r.student)
    // const [newOrExisting, setNewOrExisting] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/students', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "pronouns": pronouns
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((s) => {
                            console.log(s)
                            createReport(s)
                            clearForm();
                            setShowAddStudentForm(false)
                        })
                }
                else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    const createReport = (newStudent) => {
        fetch('/reports', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": `${newStudent.name}'s ${displayedCourse.name} Report`,
                "course_id": displayedCourse.id,
                "student_id": newStudent.id
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((report) => {
                            console.log(report)
                            handleAddReport(report)
                        })
                }
                else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    // const createExistingStudentReport = (e) => {
    //     e.preventDefault()
    //     fetch('/reports', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "title": `${existingStudentName}'s ${displayedCourse.name} Report`,
    //             "course_id": displayedCourse.id,
    //             "student_id": existingStudentID
    //         })
    //     })
    //         .then((r) => {
    //             if (r.ok) {
    //                 r.json()
    //                     .then((report) => {
    //                         console.log(report)
    //                         handleAddReport(report)
    //                     })
    //             }
    //             else {
    //                 r.json().then((err) => setErrors(err.errors));
    //             }
    //         })
    // }

    const handleAddReport = (newReport) => {
        setReports([...reports, newReport])
    }

    const clearForm = () => {
        setName("")
        setPronouns("")
    }


    return (
        <Stack direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontFamily={"Karla Normal"} fontSize={'2xl'}>Add a Student</Heading>
                    <form onSubmit={handleSubmit}>
                            <FormField>
                                <Label htmlFor="name">Student's Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormField>
                            <FormField >
                                <RadioGroup onChange={setPronouns} value={pronouns}>
                                    <Stack direction='row'>
                                        <Radio value='She'>She/Her</Radio>
                                        <Radio value='He'>He/Him</Radio>
                                        <Radio value='They'>They/Them</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormField>
                            <FormField>
                                <StyledButton type="submit">
                                    Add a New Student
                                </StyledButton>
                            </FormField>
                            <FormField>
                                {errors.map((err) => (
                                    <Error key={err}>{err}</Error>
                                ))
                                }
                            </FormField>
                        </form>

                    {/* {newOrExisting ? (
                        <form onSubmit={handleSubmit}>
                            <FormField>
                                <Label htmlFor="name">Student's Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormField>
                            <FormField >
                                <RadioGroup onChange={setPronouns} value={pronouns}>
                                    <Stack direction='row'>
                                        <Radio value='She'>She/Her</Radio>
                                        <Radio value='He'>He/Him</Radio>
                                        <Radio value='They'>They/Them</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormField>
                            <FormField>
                                <StyledButton type="submit">
                                    Add a New Student
                                </StyledButton>
                            </FormField>
                            {/* <FormField>
                                <Button onClick={setNewOrExisting(newOrExisting => !newOrExisting)}>
                                    Does the student already exist?
                                </Button>
                            </FormField> */}
                            {/* <FormField>
                                {errors.map((err) => (
                                    <Error key={err}>{err}</Error>
                                ))
                                }
                            </FormField>
                        </form>

                    ) : (
                        <form onSubmit={createExistingStudentReport}>
                            <FormField>
                                <Label htmlFor="existing_student">Existing Students</Label>
                                <select
                                    name="existing_student"
                                    id="existing_student"
                                    onChange={(e) => {
                                        let valArr = e.target.value.split(",")
                                        setExistingStudentID(valArr[1])
                                        setExistingStudentName(valArr[0])
                                    }}>
                                    {otherStudents.map(s => <option value={[s.name, s.id]}>{s.name}</option>)}
                                </select>
                            </FormField>
                            <FormField>
                                <StyledButton type="submit">
                                    Add an Existing Student
                                </StyledButton>
                            </FormField>
                            {/* <FormField>
                                <Button onClick={setNewOrExisting(newOrExisting => !newOrExisting)}>
                                    Is this a new student?
                                </Button>
                            </FormField> */}
                            {/* <FormField>
                                {errors.map((err) => (
                                    <Error key={err}>{err}</Error>
                                ))
                                }
                            </FormField>
                        </form> */}

                </Stack>
            </Flex>
        </Stack>
    )
}

export default AddStudent;