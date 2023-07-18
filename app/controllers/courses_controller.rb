class CoursesController < ApplicationController
    def index
        courses = Course.all
        render json: courses
    end

    def show
        course = Course.find_by(id: params[:id])
        if course
          render json: course
        else
          render json: { error: "course not found" }, status: :not_found
        end
    end

    def create
        course = Course.create(course_params)
        render json: course, status: :created
    end

    private
    def course_params
        params.permit(:name, :description, :teacher_id)
    end
end
