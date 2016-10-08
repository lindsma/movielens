require 'active_record'
require_relative '../db/migrate/002_create_movies'
#
class Movie < ActiveRecord::Base
  has_many :ratings
  has_many :users, through: :ratings

  # attr_reader :movie_id, :title, :release_date, :video_release, :url
  # def initialize(options) #title, genre, rating, release_date)
  #   @movie_id = options['movie_id']
  #   @title = options['title']
  #   @release_date = options['release_date']
  #   @url = options['url']
  # end
  #
  # def title_by_id(THISISADATABASE, movie_id)
  #   THISISADATABASE.each do |row|
  #     if row[0] == @movie_id
  #       @title = row[1]
  #     end
  #   end
  # end
end
