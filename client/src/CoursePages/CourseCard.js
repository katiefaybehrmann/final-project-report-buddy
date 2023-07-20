import React, {useContext} from "react";
import { UserContext } from "../Context";
import { Card, CardHeader, Heading, CardBody, Button, CardFooter, Progress, VStack } from "@chakra-ui/react";

function CourseCard({ course }) {
    const { user, setUser } = useContext(UserContext)

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
                <Progress value={80} />
            </CardBody>
            <CardFooter>
                <VStack>
                    <Button>View Course</Button>
                    <Button onClick={() => handleDeleteClick(course)}>Delete Course</Button>
                </VStack>
            </CardFooter>
        </Card>
    )
}
export default CourseCard;