class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :teacher_id
  belongs_to :teacher 
  has_many :competency_categories
  has_many :reports
  has_many :students
end
