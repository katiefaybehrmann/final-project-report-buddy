class TeachersController < ApplicationController
    # skip_before_action :authorized, only: [:create]

    # def create
    #     teacher = Teacher.create(teacher_params)
    #     if teacher.valid?
    #         session[:teacher_id] = teacher.id
    #         render json: teacher, status: :created
    #     else
    #         render json: {errors: teacher.errors.full_messages}, status: :unprocessable_entity
    #     end
    # end

    # def show
    #     current_teacher = Teacher.find(session[:teacher_id])
    #     render json: current_teacher
    # end

    def index
        teachers = Teacher.all
        render json: teachers
    end

    def show
        teacher = Teacher.find_by(id: params[:id])
        if teacher
          render json: teacher
        else
          render json: { error: "Teacher not found" }, status: :not_found
        end
    end

    def create
        teacher = Teacher.create(teacher_params)
        render json: teacher, status: :created
    end

    private
    def teacher_params
        params.permit(:username, :password, :password_confirmation)
    end
end
