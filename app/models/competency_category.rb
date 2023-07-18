class CompetencyCategory < ApplicationRecord
    belongs_to :course 
    has_many :competencies
end
