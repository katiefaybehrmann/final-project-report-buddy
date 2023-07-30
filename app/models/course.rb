class Course < ApplicationRecord
    belongs_to :teacher 
    has_many :competency_categories, dependent: :delete_all
    has_many :reports, dependent: :delete_all
    has_many :students, through: :reports

    validates_presence_of :name, :description
end
