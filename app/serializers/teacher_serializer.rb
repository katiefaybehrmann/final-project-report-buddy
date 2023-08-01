class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest
  has_many :courses
  has_many :competency_categories
  has_many :reports

end
