class Place < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true  
  validates :address, presence: true
  validates :address, uniqueness: true

end
