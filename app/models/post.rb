class Post < ActiveRecord::Base
  # mount_uploader :img, AvatarUploader

  validates :title, :can_comment, presence: true
  validates :title, uniqueness: true

	acts_as_taggable_on :tags

  belongs_to :user
end
