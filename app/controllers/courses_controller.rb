class CoursesController < ApplicationController
    def index
        courses = current_teacher.courses
        render json: courses, status: created
    end

    def show
        course = current_teacher.couses.find_by(id: params[:id])
        if course
          render json: course, include: ['reports', 'reports.student']
        else
            render_not_found_response
        end
    end

    def create
        course = current_teacher.courses.create(course_params)
        if course.valid?
            render json: course, status: :created
        else
            render_unprocessable_entity_response
        end         
    end

    def update
        course = current_teacher.courses.find_by(id: params[:id])
        if course
            course.update(course_params)
            if course.valid?
                render json: course, status: :created
            else
                render_unprocessable_entity_response
            end
        else
            render_not_found_response
        end
    end

    def destroy
        course = current_teacher.courses.find_by(id: params[:id])
        if course
            course.destroy
            head :no_content
        else
            render_not_found_response
        end
    end

    private

    def render_unprocessable_entity_response
        render json: {errors: course.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Course not found" }, status: :not_found
    end

    def course_params
        params.permit(:name, :description, :teacher_id)
    end

    def current_teacher
        current_teacher = Teacher.find(session[:teacher_id])
    end
end
