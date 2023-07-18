class CreateCompetencyCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :competency_categories do |t|
      t.string :name
      t.string :description
      t.integer :course_id

      t.timestamps
    end
  end
end
