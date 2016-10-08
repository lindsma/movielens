require 'active_record'
#
class CreateRatings < ActiveRecord::Migration[5.0]
  def up
    create_join_table :users, :movies, table_name: :ratings do |t|
      t.references :user, index: true, foreign_key: true
      t.references :movie, index: true, foreign_key: true
      t.float :rating
      t.string :timestamp
    end
  end

  def down
    drop_table :ratings
  end
end

def main
  action = (ARGV[0] || :up).to_sym
  CreateRatings.migrats(action)
end
