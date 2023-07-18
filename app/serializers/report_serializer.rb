class ReportSerializer < ActiveModel::Serializer
  attributes :id, :title, :course_id, :student_id
end
