class StudentsController < ApplicationController
    def index
        students = Student.all
        render json: students
    end

    def show
        student = Student.find_by(id: params[:id])
        if student
          render json: student
        else
          render json: { error: "student not found" }, status: :not_found
        end
    end

    def create
        student = Student.create(student_params)
        render json: student, status: :created
    end

    private
    def student_params
        params.permit(:name, :pronouns)
    end
end
