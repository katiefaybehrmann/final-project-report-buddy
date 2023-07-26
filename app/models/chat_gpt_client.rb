# app/services/chat_gpt_client.rb
require 'rest-client'

class ChatGptClient < ApplicationRecord
  BASE_URL = 'https://api.openai.com/v1/completions'.freeze

  def self.generate_response(prompt)
    response = RestClient.post(BASE_URL, {
      prompt: prompt,
      model: "text-davinci-003",
      max_tokens: 10, # You can adjust the response length as needed
      temperature: 0.5, # Controls the randomness of the response, lower values make it more focused
      api_key: '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'
    })
    
    JSON.parse(response.body)['choices'][0]['text']
  end
end
