class CompetencySerializer < ActiveModel::Serializer
  attributes :id, :mastery, :notes, :competency_category_id
  belongs_to :competency_category
  belongs_to :report
end
