require 'active_record'
require_relative 'schema'
require_relative 'environment'

class User < ActiveRecord::Base
  validates :age, :gender, :job, presence: true
  has_many :ratings
  has_many :movies, through: :ratings
end
