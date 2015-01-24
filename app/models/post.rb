class Post < ActiveRecord::Base
  mount_uploader :img, AvatarUploader

  validates :title, :can_comment, presence: true
  validates :title, uniqueness: true

  belongs_to :user
end
