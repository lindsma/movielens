#
class CreateMovies < ActiveRecord::Migration[5.0]
  def up
    create_table :movies do |t|
      t.string :title
      t.string :release_date
      t.string :video_release
      t.string :url
      t.integer :unknown
      t.integer :action
      t.integer :adventure
      t.integer :animation
      t.integer :children
      t.integer :comedy
      t.integer :crime
      t.integer :documentary
      t.integer :drama
      t.integer :fantasy
      t.integer :filmnoir
      t.integer :horror
      t.integer :musical
      t.integer :mystery
      t.integer :romance
      t.integer :scifi
      t.integer :thriller
      t.integer :war
      t.integer :western
    end
  end

  def down
    drop_table :movies
  end
end


def main
  action = (ARGV[0] || :up).to_sym
  CreateMovies.migrats(action)
end
