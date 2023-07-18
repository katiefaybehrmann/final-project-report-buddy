Rails.application.routes.draw do
  
  resources :competencies
  resources :competency_categories
  resources :reports
  resources :courses
  resources :students
  resources :teachers
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
