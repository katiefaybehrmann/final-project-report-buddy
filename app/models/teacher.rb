class Teacher < ApplicationRecord
    has_secure_password

    has_many :courses
    has_many :competency_categories, through: :courses
    has_many :reports, through: :courses
    
    validates :username, presence: true, uniqueness: true
end
