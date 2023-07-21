class Student < ApplicationRecord
    has_many :reports
    has_many :courses, through: :reports

    validates :name, presence: true, uniqueness: true
end
