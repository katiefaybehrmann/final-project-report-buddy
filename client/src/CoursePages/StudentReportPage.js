import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../Context";
import { Card, CardBody, Stack, StackDivider, Box, Text, Heading, Button, Container, HStack } from "@chakra-ui/react";
import { StyledButton, Error } from "../styling/styled-components";
import { v4 as uuidv4 } from 'uuid'
import StudentCompetency from "./StudentCompetency";
import AddStudentCompetency from "./AddStudentCompetency";
import GeneratedReport from "./GeneratedReport";

function StudentReportPage({ reports, setReports }) {
    let { course_id, id } = useParams();
    const { user } = useContext(UserContext)
    const displayedCourse = user.courses.find(c => c.id == course_id)
    const displayedReport = reports.find(r => r.id == id)
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const masteryValues = displayedReport.competencies.map(c => c.mastery)

    const average = (masteryValues) => {
        let sum = 0;
        for (let i = 0; i < masteryValues.length; i++) {
            sum += masteryValues[i];
        }
        return sum / masteryValues.length;
    }

    const reportNotesArray = displayedReport.competencies.map(c => `${displayedReport.student.pronouns} received a ${c.mastery} on ${(displayedCourse.competency_categories.find(cc => cc.id == c.competency_category_id)).name}. ${c.notes} `)
    const reportNotesStr = reportNotesArray.join('')

    //makes call to Open AI
    const handleGenerateReport = (e) => {
        e.preventDefault()
        setIsLoading(true);
        fetch(`/chat/generate_response`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "prompt": `two to three sentences of an end-of-semester report for ${displayedReport.student.name} who is scoring ${average(masteryValues)}% in ${displayedCourse.name}`
            })
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json()
                        .then((generated_report) => {
                            generated_report.response ? (
                            generateReport(generated_report.response.content + " " + reportNotesStr)) :(
                                console.log("rate limit exceeded")
                            )
                        });
                }
                else {
                    r.json().then((err) => console.log(err.errors));
                }
            }).catch((err) => console.log(err))

    }

    //create report text
    const generateReport = (generatedReport) => {
        fetch(`/reports/${displayedReport.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "text": generatedReport
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json()
                        .then((report) => {
                            console.log(report)
                            handleUpdateGeneratedReports(report)
                        })
                }
                else {
                    r.json().then((err) => setErrors(err.errors));
                }
            })
    }

    //update report variable to trigger rerender
    const handleUpdateGeneratedReports = (genReport) => {
        const updatedReports = reports.map(r => r.id == genReport.id ? genReport : r)
        setReports(updatedReports)
    }


    return (
        <Container>
            <HStack divider={<StackDivider />}>
                <Heading size='lg' margin="10px">{displayedReport.student.name}</Heading>
                {displayedReport.text ? (
                    <GeneratedReport displayedReport={displayedReport} handleUpdateGeneratedReports={handleUpdateGeneratedReports} />
                ) : (
                    <div>
                        <Button onClick={handleGenerateReport}>{isLoading ? "Loading..." : "Generate Report"}</Button>
                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))
                        }
                    </div>
                )}
            </HStack>
            <Card margin='10px'>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {displayedCourse.competency_categories.map((cc) => (
                            <Box key={uuidv4()}>
                                <Heading size='xs' textTransform='uppercase'>
                                    {cc.name}
                                </Heading>
                                <Text pt='4' fontSize='sm'>
                                    {cc.description}
                                </Text>
                                <br/>
                                {displayedReport.competencies.find(comp => comp.competency_category_id === cc.id) ? (
                                    <StudentCompetency key={uuidv4()} displayedReport={displayedReport} reports={reports} setReports={setReports} cc={cc} />
                                ) : (
                                    isAdding ? (
                                        <AddStudentCompetency key={uuidv4()} displayedReport={displayedReport} reports={reports} setReports={setReports} cc={cc} setIsAdding={setIsAdding} />

                                    ) : (
                                        <div>
                                            <Button onClick={() => setIsAdding((isAdding) => !isAdding)}>
                                                <span aria-label="edit">
                                                    Add Student Progress
                                                </span>
                                            </Button>
                                        </div>
                                    )

                                )}
                            </Box>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
            <StyledButton as={Link} to={`/courses/${course_id}/students`}>
                {`< Back`}
            </StyledButton>
        </Container>
    )
}

export default StudentReportPage;