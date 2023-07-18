class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :teacher_id
end
