class CompetencyCategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :course_id
end
