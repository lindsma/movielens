require_relative 'environment'

#
class CreateProfessorsTable < ActiveRecord::Migration[5.0]
  def up
    create_table :professors do |t|
      t.string :prof_name
      t.integer :years_experience
      t.integer :college_id
    end
  end

  def down
    drop_table :professors
  end
end

#
class CreateStudentsTable < ActiveRecord::Migration[5.0]
  def up
    create_table :students do |t|
      t.string :student_name
      t.integer :years_completed, default: 0
      t.integer :college_id
    end
  end

  def down
    drop_table :students
  end
end

#
class CreateCollegesTable < ActiveRecord::Migration[5.0]
  def up
    create_table :colleges do |t| # create_join_table
      t.string :college_name
      t.integer :ranking
    end
  end

  def down
    drop_table :colleges
  end
end

#
class CreateSemestersTable < ActiveRecord::Migration[5.0]
  def up
    create_join_table :professor, :students, table_name: :semesters do |t|
      # t.index :college_id
      t.references :professor, index: true, foreign_key: true
      t.references :student, index: true, foreign_key: true
      t.string :class_name, index: true
    end
  end

  def down
    drop_table :semesters
  end
end

def main
  action = (ARGV[0] || :up).to_sym
  CreateProfessorsTable.migrate(action)

  action = (ARGV[1] || :up).to_sym
  CreateStudentsTable.migrate(action)

  action = (ARGV[2] || :up).to_sym
  CreateCollegesTable.migrate(action)

  action = (ARGV[3] || :up).to_sym
  CreateSemestersTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
