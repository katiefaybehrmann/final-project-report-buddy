import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../Context";
import { Card, CardHeader, Heading, CardBody, StackDivider, Stack, Box, Text, Button } from "@chakra-ui/react";
import AddStudent from "./AddStudent";

function CourseStudents({reports, setReports}) {
    const { user } = useContext(UserContext);
    let { course_id } = useParams();
    const displayedCourse = user.courses.find(c => c.id == course_id)
    const courseReports = reports.filter((r) => (r.course_id == displayedCourse.id))
    const [showAddStudentForm, setShowAddStudentForm] = useState(false)

    return (
        <div>
            <Card>
                <CardHeader>
                    <Heading size='md'>{displayedCourse.name} Students</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {courseReports.map((r) => (
                            <Box as={Link} to={`/courses/${course_id}/students/${r.id}`}>
                            <Heading size='xs' textTransform='uppercase'>
                                {r.student.name}
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {r.title}
                            </Text>
                        </Box>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
            {showAddStudentForm ? (
                <AddStudent setShowAddStudentForm={setShowAddStudentForm} displayedCourse={displayedCourse} reports={reports} setReports={setReports} />
            ) :
                (
                    <div className="actions">
                        <Button onClick={() => setShowAddStudentForm((showAddStudentForm) => !showAddStudentForm)}>
                            Add a Student
                        </Button>
                    </div>
                )}
        </div>
    )
}


export default CourseStudents;

