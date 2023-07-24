class StudentsController < ApplicationController
    def index
        students = Student.all
        render json: students, status: created
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
        if student.valid?
            render json: student, status: :created
        else
            render_unprocessable_entity_response
        end
    end

    private

    def render_unprocessable_entity_response
        render json: {errors: students.errors.full_messages}, status: :unprocessable_entity
    end

    def student_params
        params.permit(:name, :pronouns)
    end
end
