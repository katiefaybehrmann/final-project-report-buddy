class ChatController < ApplicationController
    skip_before_action :authorized, only: [:generate_response]


    # app/controllers/chat_controller.rb
    def generate_response
        # @response = ChatGptClient.call(params[:message])
      message = params[:prompt]
      response = ChatGptClient.generate_response(message)
  
      render json: {response: response}
    end
  
end
