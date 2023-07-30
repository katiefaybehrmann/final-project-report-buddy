# Phase 5 Capstone Project: ReportBuddy

## Description

ReportBuddy is the perfect single page application for a teacher or education professional struggling to write end-of-the-year or end-of-semester reports quickly. With much on their plates already, teachers often are required to write reports for each of their students in each subject they teach, detailing their strengths and weaknesses in a variety of academic and behavioral realms. With 3-4 classes of 20-30 students, the number of written reports and out-of-school work hours add up fast. Leveraging the power of  Ruby on Rails, React, and OpenAI, ReportBuddy is an app designed specifically for writing end-of-semester student reports. Quickly, efficiently, and thoroughly.

In the wide world of EdTech’s learning management systems, gradebook apps, and myriad other virtual teaching tools, there does not yet exist a sleek and easy app for teachers with the sole purpose of writing and collating reports. This technology will save teachers precious time, create a lasting record for students, and presents opportunities for integration into other LMS or gradebook systems.

Teachers will have access to a password-protected database organized by students and courses. Teachers will be able to add competencies to each course and easily document students’ mastery in each competency. Reports are generated from OpenAI with this information.

Database Models, Information Architecture, and Wireframes can be found here: https://www.figma.com/file/TnVSONQ2BOA8jawzcI3YGi/report-app-(Copy)?type=whiteboard&node-id=0-1&t=U2nUNNeGO6sHWjPZ-0.


## Project features and requirements

1. Include a many to many relationship.
ReportBuddy features two separate reciprocal many-to-many relationships:
- Students have many Courses, and Courses have many Students through Reports
- Reports have many Competency Categories, and Competency Categories have many reports through Competencies

2. Implement a minimum of 4 models.
ReportBuddy has six models: Teachers, Students, Reports, Courses, Competencies, and Competency Categories. Please refer to this diagram for more information on ReportBuddy's database models: https://www.figma.com/file/TnVSONQ2BOA8jawzcI3YGi/report-app-(Copy)?type=whiteboard&node-id=0-1&t=U2nUNNeGO6sHWjPZ-0. 

3. Implement a minimum of 5 client side routes using React router.
ReportBuddy features five client routes using react-router-dom, including two dynamic routes:
- Home ("/")
- About ("/about")
- List of courses ("/courses")
- List of students per course ("/courses/:course_id/students")
- Individual student page per course ("/courses/:course_id/students/:id")

4. Implement password protection and authentication.
ReportBuddy uses the bcrypt gem and the has_secure_password macro to ensure safe, secure, and encrypted usage.

Include full CRUD on at least 1 model, following REST conventions.
Currently ReportBuddy features full CRUD on the report model, though all other models include create, read, and either delete or update functionality.

Implement validations and error handling.
Each model in ReportBuddy has specific validations. When errors occur, they are displayed sleekly on the front end to communicate information with the user.

Implement something new not taught in the curriculum. (Check in with your instructor to ensure the scope of your idea is appropriate.)
ReportBuddy is fully integrated with OpenAI's ChatGPT function to help generate reports for students. More information on my learnings can be found on my blog: https://katiebehrmann.org/codey-behrmann/2023/7/30/integrating-openai-into-a-ruby-on-railsreact-edtech-app. 

Implement useContext or Redux.
useContext is employed in ReportBuddy to quickly obtain user data and ensure seamless usage.

Fully deploy and host your project.
This project has been deployed successfully using Render.

### User Journey

As a user, I can:

- Sign up and Log into ReportBuddy
- View how many reports I have left to generate
- View my courses
- Create and add a course
- Delete a course and its dependent reports and competency categories
- Add a student to a course, which generates a new report
- Delete a report, which deletes the student from the course.
- Add a competency category to a course. This generates an individual competency for each student's report.
- Add an individual competency for a student's report.
- Update the invidual competency.
- Update the text field of the report by generating a report through OpenAI.
- Update the generated report.
- Delete the text from a generated report if I want to regenerate it.
