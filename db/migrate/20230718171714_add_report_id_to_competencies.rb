class AddReportIdToCompetencies < ActiveRecord::Migration[6.1]
  def change
    add_column :competencies, :report_id, :integer
  end
end
