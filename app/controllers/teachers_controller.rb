class TeachersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        teacher = Teacher.create(teacher_params)
        if teacher.valid?
            session[:teacher_id] = teacher.id
            render json: teacher, status: :created
        else
            render json: {errors: teacher.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        current_teacher = Teacher.find(session[:teacher_id])
        render json: current_teacher, include: ['courses','courses.reports', 'courses.competency_categories']
    end

    private
    def teacher_params
        params.permit(:username, :password, :password_confirmation)
    end
end
