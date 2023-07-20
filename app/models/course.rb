class Course < ApplicationRecord
    belongs_to :teacher 
    has_many :competency_categories
    has_many :reports
    has_many :students, through: :reports

    validates_presence_of :name, :description
end
