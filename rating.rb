require 'active_record'
require_relative 'schema'
require_relative 'environment'

class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie
end
