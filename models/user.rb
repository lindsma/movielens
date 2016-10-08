require 'active_record'
require_relative '../db/migrate/001_create_users'

#
class User < ActiveRecord::Base
  validates :age, :gender, :job, presence: true
  has_many :ratings
  has_many :movies, through: :ratings
end
