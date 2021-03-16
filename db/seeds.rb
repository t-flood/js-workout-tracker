# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Workout.create([{id: 10, name: "Chest", date: "2020-10-20T00:00:00.000Z"}])


Exercise.create([
  {name: "Bench", sets: "3", reps: "5", weight: "100", notes: "a note", workout_id: 10 }
])
