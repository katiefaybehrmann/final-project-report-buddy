import React, { useContext } from "react";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";
import { Card, CardHeader, Heading, CardBody, Button, CardFooter, VStack, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function CourseCard({ course }) {
    const { user, setUser } = useContext(UserContext)
    const unfinishedReports = course.reports.filter(r => r.text == null).length
    const totalReports = course.reports.length
    const reportProgress = ((totalReports - unfinishedReports) / totalReports) * 100

    const handleDeleteCourse = (deletedCourse) => {
        const updatedCourses = user.courses.filter(c => c.id !== deletedCourse.id)
        const updatedUser = { ...user, courses: updatedCourses }
        setUser(updatedUser)
    }
    const handleDeleteClick = (deletedCourse) => {
        fetch(`/courses/${deletedCourse.id}`, {
            method: "DELETE",
        });
        handleDeleteCourse(deletedCourse)
    }

    return (
        <Card>
            <CardHeader>
                <Heading size='md'>{course.name}</Heading>
            </CardHeader>
            <CardBody>
                <CircularProgress size='75px' value={reportProgress ? (reportProgress) : (0)} color='#3F5B6C'>
                    <CircularProgressLabel>{reportProgress ? (reportProgress) : (0)}%</CircularProgressLabel>
                </CircularProgress>
            </CardBody>
            <CardFooter>
                <VStack>
                    <Button as={Link} to={`/courses/${course.id}/students`}>View Course</Button>
                    <Button onClick={() => handleDeleteClick(course)}>Delete Course</Button>
                </VStack>
            </CardFooter>
        </Card>
    )
}
export default CourseCard;