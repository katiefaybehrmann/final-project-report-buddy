class ReportSerializer < ActiveModel::Serializer
  attributes :id, :title, :course_id, :student_id, :text
  belongs_to :student 
  belongs_to :course 
  has_many :competencies
  has_many :competency_categories

  # def generated_report
  # end
end
