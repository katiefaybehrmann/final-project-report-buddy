import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context";

function CourseStudents() {
    const { user } = useContext(UserContext);
    let { course_id } = useParams();
    const displayedCourse = user.courses.find(c => c.id == course_id)

    return (
        <div>
            <p>
                {displayedCourse.name}
            </p>
        </div>
    )
}

export default CourseStudents;