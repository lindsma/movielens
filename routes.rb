require_relative 'models/movie'
require_relative 'models/user'
require_relative 'models/rating'
require 'yaml'
require 'json'
require 'sinatra'
require 'pry'

database_config = YAML::load(File.open('config/database.yml'))

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])

before do
  content_type :json
end

get '/' do
  File.read(File.join('Public', 'index.html'))
end

get '/api/movies' do
  Movie.select(:id, :title).all.to_json
end

after do
  ActiveRecord::Base.connection.close
end

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
  JSON.dump [{id: 1, title: "From Dusk Till Dawn"}]
  # JSON.dump '{"title": "Random Horror Movie"}'
  # title
  # avg rating
  # url link
  # release data
  # other genres
  #
end

get '/api/title-search' do
  if !params['search'].nil?
    movie_data = Movie.where("title like (?)", "%#{params['search']}%")
    movie_info = movie_data[0]
    movie_title_and_date = movie_info['title']
    movie_title = movie_title_and_date[/[^(]+/].rstrip()

    # Needs a massive refactor.

    if movie_data.empty?
      halt(404)
    end
    status 200
    movie_title.to_json
  end

  average_rating = Rating.where(
    movie_id: movie_info['id']
  ).average('rating').round(2).to_f.to_json
  p "#{movie_title} #{average_rating}"
end

#   movie = Movie.includes(title: params['title'])
#   movie.to_json
# end

get '/api/user-count' do
  total_users = User.count.to_json
end

# get '/api/search/:movie_id' do
#   movie_info = Movie.where(id: params['movie_id'])
#   movie_data = movie_info[0]
#
#   movie_title = movie_data['title']
#   movie_title = movie[/[^(]+/].rstrip()
#   movie_title.to_json
#
#   average_rating = Rating.where(
#     movie_id: params['movie_id']
#   ).average('rating').round(2).to_json
# end

post '/api/add_user' do
  new_user = User.create(
    id: User.maximum(:id).next, age: params['age'],
    gender: params['gender'], job: params['job']
  )
  if new_user.valid?
    if new_user.save
      status 201
      p '201'
      return new_user.to_json
    end
    status 400
    p '400'
  end
  halt(400)
  'end 400'
end

get '/api/top20' do
  Rating.where.average('rating').all.round(2).to_f.to_json
  # Rating.where(Movie.average('rating').round(2).to_json
end
