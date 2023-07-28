class AddTextToReports < ActiveRecord::Migration[6.1]
  def change
    add_column :reports, :text, :text
  end
end
