class Report < ApplicationRecord
    belongs_to :student 
    belongs_to :course 
    has_many :competencies
    has_many :competency_categories, through: :competencies
end
