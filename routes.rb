require_relative 'environment'
require_relative 'movie'
require_relative 'user'
require_relative 'rating'
require 'yaml'
require 'json'
require 'sinatra'
require 'pry'

# database_config = YAML::load(File.open('config/database.yml'))
#
# ActiveRecord::Base.establish_connection(database_config)

before do
  content_type :json
end

# after do
#   ActiveRecord::Base.connection.close
# end

get '/api/movie-list' do
  Movie.select(:id, :title).all.to_json
end

# hardcode
get '/api/search?' do
  # JSON.dump({id: 1, title: "Seven"}
  # JSON.dump '{"id": 2, "title": "GoldenEye"}'
end

# hardcode
get '/api/genre/horror' do
  JSON.dump '{"title": "From Dusk Till Dawn"}'
  # JSON.dump '{"title": "Random Horror Movie"}'
end

get '/api/title-search' do
  if !params['search'].nil?
    movie = Movie.where("title like (?)", "%#{params['search']}%")
    if movie.empty?
      halt(404)
    end
    status 200
    movie.to_json
  end
end

#   movie = Movie.includes(title: params['title'])
#   movie.to_json
# end

get '/api/user-count' do
  total_users = User.count.to_json
end



get '/api/search/:movie_id' do
  movie_info = Movie.where(id: params['movie_id'])
  movie_data = movie_info[0]

  movie_title = movie_data['title'].to_json

  average_rating = Rating.where(
    movie_id: params['movie_id']
  ).average('rating').round(2).to_json

end

get '/api/top20' do
  average_rating = Rating.where(Movie.all).average('rating').round(2).to_json
  if average_rating >= 4.6

  end
end
