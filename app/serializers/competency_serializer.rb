class CompetencySerializer < ActiveModel::Serializer
  attributes :id, :mastery, :notes, :competency_category_id
end
