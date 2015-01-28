# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

time_start = Time.now

user = User.new(
  name: 'yang',
  email: 'yang@gmail.com',
  password: User.hash_password('123456'),
  avatar: '/test.png'
)
user.save!



time_end = Time.now
time = time_end - time_start
puts time.to_s
