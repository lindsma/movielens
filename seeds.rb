require 'csv'
require_relative 'environment'
require_relative 'movie'
require 'pry'

# .gsub(/,/, '')

csv = CSV.read('u.item', 'r:ISO-8859-1', col_sep: '|')
csv.each do |row|
  Movie.create!(title: row[1], release_date: row[2], video_release: row[3],url: row[4], unknown: 0, action: row[6], adventure: row[7], animation: row[8], children: row[9], comedy: row[10], crime: row[11], documentary: row[12], drama: row[13], fantasy: row[14], filmnoir: row[15], horror: row[16], musical: row[17], mystery: row[18], romance: row[19], scifi: row[20], thriller: row[21], war: row[22], western: row[23])
end
