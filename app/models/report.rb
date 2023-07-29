class Report < ApplicationRecord
    belongs_to :student 
    belongs_to :course 
    has_many :competencies
    has_many :competency_categories, through: :competencies

    validates_presence_of :title, :course_id, :student_id

    def report_average
        masteries = self.competencies.map {|x| x.mastery}
        report_average = masteries.sum(0.0) / masteries.length
        if report_average < 70.0
          "poorly"
        elsif 70.0 <= report_average && report_average < 80.0
          "satisfactorily"
        elsif 80.0 <= report_average && report_average < 90.0
          "well"
        else
          "excellently"
        end
      end
end
