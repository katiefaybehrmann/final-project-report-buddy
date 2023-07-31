class CompetencyCategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :course_id
  belongs_to :course 
  # belongs_to :teacher
  has_many :competencies
end
