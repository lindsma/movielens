require 'active_record'
#
class CreateUsers < ActiveRecord::Migration[5.0]
  def up
    create_table :users do |t|
      t.integer :age
      t.string :gender
      t.string :job
    end
  end

  def down
    drop_table :users
  end
end

def main
  action = (ARGV[0] || :up).to_sym
  CreateUsers.migrate(action)
end
