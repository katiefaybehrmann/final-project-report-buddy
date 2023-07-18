class SessionsController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        teacher = Teacher.find_by(username: params[:username])
        if teacher&.authenticate(params[:password])
            session[:teacher_id] = teacher.id
            render json: teacher, status: :created
        else
            render json: {errors: ["Invalid username or password"]}, status: :unauthorized
        end
    end

    def destroy
        session.delete :teacher_id
        head :no_content
    end
end
