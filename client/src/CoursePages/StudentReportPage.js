import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context";
import { Card, CardBody, Stack, StackDivider, Box, Text, Heading } from "@chakra-ui/react";
import StudentCompetency from "./StudentCompetency";
import AddStudentCompetency from "./AddStudentCompetency";

function StudentReportPage({reports, setReports}){
    let {course_id, id} = useParams();
    const { user } = useContext(UserContext)
    const displayedCourse = user.courses.find(c => c.id == course_id)
    const displayedReport = reports.find(r => r.id == id)


    return (
        <div>
            <h3>{displayedReport.student.name}</h3>
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
                                <StudentCompetency displayedReport={displayedReport} reports={reports} setReports={setReports} cc={cc}/>
                            ) : (
                                <AddStudentCompetency/>
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