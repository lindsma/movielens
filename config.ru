require_relative './routes'

run Sinatra::Application

use ActiveRecord::ConnectionAdapters::ConnectionManagement

# set :public_folder, File.join(APP_ROOT, "public")
