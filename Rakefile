require 'rubygems'
require 'bundler/setup'
require 'active_record'
require 'pg'
require 'yaml'

namespace :db do
  desc "Migrate the db"
  task :migrate do
    connection_details = YAML::load(File.open('config/database.yml'))
    ActiveRecord::Base.establish_connection(connection_details) #(ENV['DATABASE_URL'])
    ActiveRecord::Migrator.migrate("db/migrate/")
  end
end
