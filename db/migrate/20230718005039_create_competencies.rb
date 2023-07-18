class CreateCompetencies < ActiveRecord::Migration[6.1]
  def change
    create_table :competencies do |t|
      t.integer :mastery
      t.string :notes
      t.integer :competency_category_id

      t.timestamps
    end
  end
end
