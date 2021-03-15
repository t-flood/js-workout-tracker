class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.belongs_to :workout
      t.string :name
      t.integer :reps
      t.integer :sets
      t.integer :weight
      t.text :notes

      t.timestamps
    end
  end
end
