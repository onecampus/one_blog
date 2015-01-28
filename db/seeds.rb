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

1.upto(50).each do |i|
  post = Post.new(
    title: "title#{i}",
		summary: "summary#{i}",
		content: "content#{i}",
		markdown: nil,
		author: 'yangkang',
		img: '/test.png',
		user_id: 1,
		publish_time: Time.now,
		is_published: 1,
		can_comment: 1,
		is_recommend: 1
	)
	post.save!
end

time_end = Time.now
time = time_end - time_start
puts time.to_s
