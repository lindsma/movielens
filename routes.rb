require_relative 'models/movie'
require_relative 'models/user'
require_relative 'models/rating'
require 'yaml'
require 'json'
require 'sinatra'
require 'pry'
require 'sinatra/cross_origin'

get '/' do
 send_file 'public/index.html'
end

# Lori's stuff start
database_config = YAML::load(File.open('config/database.yml'))

before do
  ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
  content_type :json
end

# after do
#   ActiveRecord::Base.connection.close
# end

get '/foo' do
  headers 'Access-Control-Allow-Origin' => 'https://shielded-taiga-96422.herokuapp.com/'
  'hello world'
end

options '/*' do
  response["Access-Control-Allow-Headers"] = "origin, x-requested-with, content-type"
end

register Sinatra::CrossOrigin

configure do
  enable :cross_origin
end
# lori's stuff

get '/api/all-movies' do
  Movie.select(:id, :title).all.to_json
end

get '/api/movie-list' do
  Movie.select(:id, :title).all.to_json
end


get '/api/genre/action' do
  action_movies = Movie.where(action: '1').all
  action_id = action_movies.select('id')
  action_movies = action_movies.select(
    'id', 'title', 'release_date', 'url'
  ).to_json
end

get '/api/genre/horror' do
  horror_movies = Movie.where(horror: '1').all
  horror_id = horror_movies.select('id')
  horror_movies = horror_movies.select(
    'id', 'title', 'release_date', 'url'
  ).to_json
end

get '/api/genre/comedy' do
  comedy_movies = Movie.where(comedy: '1').all
  comedy_id = comedy_movies.select('id')
  comedy_movies = comedy_movies.select(
    'id', 'title', 'release_date', 'url'
  ).to_json
end

get '/api/genre/fantasy' do
  fantasy_movies = Movie.where(fantasy: '1').all
  fantasy_id = fantasy_movies.select('id')
  fantasy_movies = fantasy_movies.select(
    'id', 'title', 'release_date', 'url'
  ).to_json
end

get '/api/genre/drama' do
  drama_movies = Movie.where(drama: '1').all
  drama_id = drama_movies.select('id')
  drama_movies = drama_movies.select(
    'id', 'title', 'release_date', 'url'
  ).to_json
end
# get '/api/get/movie/:title' do |title|
#   movies = Movie.where(["title like (?)", "%#{params[:title]}%20"])
#   movies.to_json
# end

# get movie title without date and avg rating for a single movie
get '/api/movies' do
  if !params['search'].nil?
    movies = Movie.where("title like (?)", "%#{params['search']}%")
    # movie_info = movie_data[0]
    # movie_title_and_date = movie_info['title']
    # movie_title = movie_title_and_date[/[^(]+/].rstrip
    # Needs a massive refactor. but it works!
    if movies.empty?
      halt(404)
    end
    status 200
    movies.to_json
  end
  # average_rating = Rating.where(
  #   movie_id: movie_info['id']
  # ).average('rating').round(1).to_f.to_json
end

get '/api/user-count' do
  User.count.to_json
end

# enter ?search=id of movie you want to get id and rating.
get '/api/info-by-id' do
  if !params['search'].nil?
    movie_info = Movie.where(id: params['search'])
    movie_data = movie_info[0]
    movie_id = movie_data['id'].to_json
  end
  average_rating = Rating.where(
    movie_id: params['search']
  ).average('rating').round(1).to_json
  p "#{movie_id} #{average_rating}"
end

# function is used to add a user.  All that is needed for params is:
# age=, gender=, job=.
post '/api/add_user' do
  new_user = User.create(
    id: User.maximum(:id).next, age: params['age'],
    gender: params['gender'], job: params['job']
  )
  if new_user.valid?
    if new_user.save
      status 201
      return new_user.to_json
    end
    status 400
  end
  halt(400)
end

get '/api/top20' do
  Rating.where.average('rating').all.round(1).to_f.to_json
  # Rating.where(Movie.average('rating').round(2).to_json
end






get '/api/test' do
  if !params['search'].nil?
    movie_data = Movie.where("title like (?)", "%#{params['search']}%")
    movie_info = movie_data[0]
    movie_title = movie_info['title']

    # Needs a massive refactor. but it works!

    if movie_data.empty?
      halt(404)
    end
    status 200
    movie_title.to_json
  end
end


  # average_rating = Rating.where(
  #   movie_id: movie_info['id']
  # ).average('rating').round(1).to_f.to_json
  # p "#{movie_title} #{average_rating}"
# end

# enter a user ID and return all movie titles, ratings and movie id's.
get '/api/users/:id' do
  user = User.find_by(id: params['id'])
  ratings = Rating.select(:movie_id, :rating, :title).joins(
    'INNER JOIN users ON ratings.user_id = users.id'
  ).where(user_id: params[:id]).joins(
    'INNER JOIN movies ON ratings.movie_id = movies.id'
  ).all

  payload = { 'user' => user, 'ratings' => ratings }

  if user.nil?
    halt(404)
  end
  status 200
  payload.to_json
end

get '/api/movies/all/:id' do
  movie = Movie.select(
    'title, imdb_url, id, avg(rating), count(rating), unknown_genre, action,' \
    ' adventure, animation, children, comedy, crime, documentary, drama, ' \
    'fantasy, film_noir, horror, musical, mystery, romance, sci_fi, thriller,' \
    ' war, western' \
  ).joins('INNER JOIN ratings ON movies.id = ratings.movie_id').where(
    id: params['id']
  ).group('title, imdb_url, id').first

  ratings = Rating.select(:user_id, :rating).joins(
    'INNER JOIN users ON ratings.user_id = users.id'
  ).where(movie_id: params[:id]).joins(
    'INNER JOIN movies ON ratings.movie_id = movies.id'
  ).all

  movie_hash = movie.as_json
  movie_hash['ratings'] = ratings.as_json
  movie_hash.to_json
end
