class ReportSerializer < ActiveModel::Serializer
  attributes :id, :title, :course_id, :student_id
  belongs_to :student 
  # belongs_to :course 
  has_many :competencies
  # has_many :competency_categories
end
