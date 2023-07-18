class CreateReports < ActiveRecord::Migration[6.1]
  def change
    create_table :reports do |t|
      t.string :title
      t.integer :course_id
      t.integer :student_id

      t.timestamps
    end
  end
end
