class Post < ActiveRecord::Base
  validates :title, :can_comment, presence: true
  validates :title, uniqueness: true
  belongs_to :user
end
