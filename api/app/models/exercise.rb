class Exercise < ApplicationRecord
  belongs_to :workout

  accepts_nested_attributes_for :workout
end
