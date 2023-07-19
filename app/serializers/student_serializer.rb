class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :pronouns
  has_many :reports
  has_many :courses
end
