class Competency < ApplicationRecord
    belongs_to :competency_category
    belongs_to :report
end
