class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorized


  def authorized
      render json: {errors: ["Not Authorized"]}, status: :unauthorized unless session.include? :teacher_id
  end

end
