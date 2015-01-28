class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || '邮件格式有误')
    end
  end
end

class User < ActiveRecord::Base
  mount_uploader :avatar, PostImgUploader

  validates :name, :password, presence: true
  validates :name, :email, uniqueness: true
  validates :email, presence: true, email: true
  has_many :posts

  def self.hash_password(pass)
    salt = 'yy'
    Digest::SHA256.hexdigest(pass + salt)
  end

  def self.authentication(email, pass)
    user = User.find_by(email: email)
    if user && Digest::SHA256.hexdigest(pass + 'yy') == user.password
      return user
    end
    nil
  end

  def generate_auth_token
    payload = { user_id: self.id }
    AuthToken.encode(payload)
  end
end
