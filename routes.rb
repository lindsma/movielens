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

# hardcode
get '/api/search?' do
  JSON.dump({id: 1, title: "Seven"})
  # JSON.dump '{"id": 2, "title": "GoldenEye"}'
end

# hardcode
get '/api/genre/horror' do
  JSON.dump({title: "From Dusk Till Dawn"})
  # JSON.dump '{"title": "Random Horror Movie"}'
end

get '/api/search' do
  # movie title and its avg rating
end



#
#
# post '/api/add/rating' do
#   new_kid = Student.create(student_name: params[:student_name],
#                            years_completed: params[:years_completed])
#   if new_kid.valid?
#     if new_kid.save
#       status 201
#       p '201'
#       return new_kid.to_json
#     end
#     status 400
#     '400'
#   end
#   halt(400)
#   'end 400'
# end
#
# post '/api/semester/' do
#   Semester.create(
#     professor_id: params['professor_id'],
#     student_id: params['student_id'],
#     class_name: params['class_name']
#   ).to_json
# end
#
# get '/api/student_names_by_class/:class_name' do
#   Student.find_by(
#     Semester.where(class_name: params['class_name']).class_name
#   ).to_json
# end
#
# # Get student information
# get '/api/student/:student_id' do
#   Student.find(
#     Semester.where(student_id: params['student_id']).first.student_id
#   ).to_json
# end
#
# # get 'api/semester/:professor_id' do
# #   Professor.find(Semester.where(professor_id: params['professor_id']).first.
# #   professor_id).to_json
# # end
#
# # enter in professor ID as a requirement, and class name as a ?class_name=x
# get '/api/class_list/:professor_id/' do
#   Semester.where(
#     professor_id: params['professor_id'],
#     class_name: params['class_name']
#   ).to_json
# end
#
# # get '/api/professors' do
# #   prof_id = params[:professor_id]
# #
# #   class_name = params[:class_name]
# #
# #   professors = Professor.all
#
# #   unless prof_id.nil?
# #     professors = professors.where(id = prof_id)
# #     puts 'hi'
# #     # not getting into these unless statements.
# #   end
# #
# #   unless class_name.nil?
# #     professors = professors.where(class_name = class_name)
# #     puts 'hellos'
# #
# #   end
# #   professors.to_json
# # end
#
# put '/api/update_years/:id' do
#   student = Student.find_by(id: params[:id])
#   student.update(years_completed: params[:years_completed]).to_json
# end
#
# delete '/api/delete/:id' do
#   student = Student.find_by(id: params[:id])
#   student.destroy
# end
#
# # Semester.where(professor_id: params['professor_id'],
# # class_name: params['class_name'])
#
# # get '/api/semester_by_prof' do
# #   Semester.where(professor_id: params['professor_id'],
# #   class_name: params['class_name'])
# # end
#
# # get '/' do
# #   College.select('*').where(id: 1).all.joins(:students).to_json
# # end
#
# # post 'api/coffees' do
# #   coffee = Coffee.new(name: params['name'], country_id: params['id'])
# #   if coffee.valid?
# #     if coffee.save
# #       status 201
# #       return coffee.to_json
# #     end
# #   end
# #   status 400
# # end
#
#
#
# get '/api/top20' do
#   p 'Movie'
# end
