# require_relative 'environment'
# require_relative '../db/migrate/001_create_users'
# require_relative '../db/migrate/002_create_movies'
# require_relative '../db/migrate/003_create_ratings'
# #
# class CreateUsers < ActiveRecord::Migration[5.0]
#   def up
#     create_table :users do |t|
#       t.integer :age
#       t.string :gender
#       t.string :job
#     end
#   end
#
#   def down
#     drop_table :users
#   end
# end
#
# #
# class CreateMovies < ActiveRecord::Migration[5.0]
#   def up
#     create_table :movies do |t|
#       t.string :title
#       t.string :release_date
#       t.string :video_release
#       t.string :url
#       t.integer :unknown
#       t.integer :action
#       t.integer :adventure
#       t.integer :animation
#       t.integer :children
#       t.integer :comedy
#       t.integer :crime
#       t.integer :documentary
#       t.integer :drama
#       t.integer :fantasy
#       t.integer :filmnoir
#       t.integer :horror
#       t.integer :musical
#       t.integer :mystery
#       t.integer :romance
#       t.integer :scifi
#       t.integer :thriller
#       t.integer :war
#       t.integer :western
#     end
#   end
#
#   def down
#     drop_table :movies
#   end
# end
#
# #
# class CreateRatings < ActiveRecord::Migration[5.0]
#   def up
#     create_join_table :users, :movies, table_name: :ratings do |t|
#       t.references :user, index: true, foreign_key: true
#       t.references :movie, index: true, foreign_key: true
#       t.float :rating
#       t.string :timestamp
#     end
#   end
#
#   def down
#     drop_table :ratings
#   end
# end
#
# def main
#   action = (ARGV[0] || :up).to_sym
#   CreateUsers.migrate(action)
#
#   action = (ARGV[1] || :up).to_sym
#   CreateMovies.migrate(action)
#
#   action = (ARGV[2] || :up).to_sym
#   CreateRatings.migrate(action)
# end
#
# main if __FILE__ == $PROGRAM_NAME
