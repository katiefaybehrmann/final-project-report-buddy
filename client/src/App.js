import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./Context";
import Login from "./SignInFlow/Login";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CourseList from "./CoursePages/CourseList";
import CourseStudents from "./CoursePages/CourseStudents";
import StudentReportPage from "./CoursePages/StudentReportPage";
import About from "./About";

function App() {
  const { user, setUser } = useContext(UserContext)
  const [loggingIn, setLoggingIn] = useState(false)
  const [reports, setReports] = useState([])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [loggingIn]);

  useEffect(() => {
    fetch("/reports")
      .then((r) => r.json())
      .then(setReports);
  }, [loggingIn]);


  return (
    <div>
      <NavBar />
      {!user ? (
        <main>
          <Login loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
        </main>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<Home reports={reports}/>} />
            <Route path="/courses" element={<CourseList reports={reports}/>} />
            <Route path="/courses/:course_id/students" element={<CourseStudents reports={reports} setReports={setReports} />}/>
            <Route path="/courses/:course_id/students/:id" element={<StudentReportPage reports={reports} setReports={setReports}/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
