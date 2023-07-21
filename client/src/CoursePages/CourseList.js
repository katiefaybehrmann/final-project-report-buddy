import React, { useContext, useState } from "react";
import { SimpleGrid, Button, Stack } from "@chakra-ui/react";
import { UserContext } from "../Context";
import CourseCard from "./CourseCard";
import AddCourse from "./AddCourse";

function CourseList() {
    const { user } = useContext(UserContext);
    const [showAddCourseForm, setShowAddCourseForm] = useState(false)

    return (
        <Stack>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {user.courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </SimpleGrid>
            {showAddCourseForm ? (
                <AddCourse setShowAddCourseForm={setShowAddCourseForm} />
            ) :
                (
                    <div className="actions">
                        <Button onClick={() => setShowAddCourseForm((showAddCourseForm) => !showAddCourseForm)}>
                            Add a Course
                        </Button>
                    </div>
                )}
        </Stack>
    )
}

export default CourseList;