class CompetencyCategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :course_id
  belongs_to :course 
  has_many :competencies
end
