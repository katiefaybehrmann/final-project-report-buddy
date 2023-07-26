import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context";
import { Card, CardBody, Stack, StackDivider, Box, Text, Heading, Button, HStack } from "@chakra-ui/react";
import StudentCompetency from "./StudentCompetency";
import AddStudentCompetency from "./AddStudentCompetency";
import GeneratedReport from "./GeneratedReport";

function StudentReportPage({ reports, setReports }) {
    let { course_id, id } = useParams();
    const { user } = useContext(UserContext)
    const displayedCourse = user.courses.find(c => c.id == course_id)
    const displayedReport = reports.find(r => r.id == id)
    const [isAdding, setIsAdding] = useState(false)
    const [hasReport, setHasReport] = useState(false)


    return (
        <div>
            <HStack>
                <h3>{displayedReport.student.name}</h3>
                { hasReport ? (
                    <div>
                        <Button>Generate Report</Button>
                    </div>
                ) : (
                    <GeneratedReport/>
                )}  
            </HStack>
            <Card>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {displayedCourse.competency_categories.map((cc) => (
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    {cc.name}
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {cc.description}
                                </Text>
                                {displayedReport.competencies.find(comp => comp.competency_category_id === cc.id) ? (
                                    <StudentCompetency displayedReport={displayedReport} reports={reports} setReports={setReports} cc={cc} />
                                ) : (
                                    isAdding ? (
                                        <AddStudentCompetency displayedReport={displayedReport} reports={reports} setReports={setReports} cc={cc} setIsAdding={setIsAdding} />

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
        </div>
    )
}

export default StudentReportPage;