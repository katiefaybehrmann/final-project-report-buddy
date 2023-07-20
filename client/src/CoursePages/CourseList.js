import React, {useContext} from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { UserContext } from "../Context";
import CourseCard from "./CourseCard";

function CourseList(){
    const {user} = useContext(UserContext);
    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {user.courses.map((course) => (
                <CourseCard key={course.id} course={course}/>
            ))}
        </SimpleGrid>
    )
}

export default CourseList;