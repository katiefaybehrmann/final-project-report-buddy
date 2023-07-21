import React, { useContext, useState } from "react";
import { SimpleGrid, Button, Stack } from "@chakra-ui/react";
import { UserContext } from "../Context";
import CourseCard from "./CourseCard";
import AddCourse from "./AddCourse";
// import { Route, Routes } from "react-router-dom";
// import CourseStudents from "./CourseStudents";

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
                {/* <Routes>
                    <Route path="/courses/:course_id" element={<CourseStudents/>}/>
                </Routes> */}
        </Stack>
    )
}

export default CourseList;