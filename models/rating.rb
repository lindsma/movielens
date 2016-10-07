require 'active_record'

class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie

  def initialize
    
  end
end
