require 'csv'
require_relative 'models/movie'
require_relative 'models/user'
require_relative 'models/rating'
require_relative 'schema'
require 'pry'
require 'active_record'

# .gsub(/,/, '')
ActiveRecord::Base.establish_connection(ENV['DATABASE_URL']) #(ENV['DATABASE_URL'])


csv = CSV.read('u.user', 'r:ISO-8859-1', col_sep: '|')
csv.each do |row|
  User.create!(id: row[0], age: row[1], gender: row[2], job: row[3])
end

csv = CSV.read('u.item', 'r:ISO-8859-1', col_sep: '|')
csv.each do |row|
  Movie.create!(
    id: row[0], title: row[1], release_date: row[2], video_release: row[3], url:
    row[4], unknown: 0, action: row[6], adventure: row[7], animation: row[8],
    children: row[9], comedy: row[10], crime: row[11], documentary: row[12],
    drama: row[13], fantasy: row[14], filmnoir: row[15], horror: row[16],
    musical: row[17], mystery: row[18], romance: row[19], scifi: row[20],
    thriller: row[21], war: row[22], western: row[23]
  )
end

csv = CSV.read('u.data', 'r:ISO-8859-1', col_sep: "\t")
csv.each do |row|
  user_id = row[0]
  movie_id = row[1]
  rating = row[2]
  timestamp = row[3]
  Rating.create!(
    user_id: user_id, movie_id: movie_id, rating: rating, timestamp: timestamp
  )
end

ActiveRecord::Base.connection.close
