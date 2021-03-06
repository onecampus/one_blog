class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || '邮件格式有误')
    end
  end
end

class User < ActiveRecord::Base

  validates :name, :password, presence: true
  validates :name, :email, uniqueness: true
  validates :email, presence: true, email: true
  has_many :posts

  def self.hash_password(pass)
    salt = 'yy'
    Digest::SHA256.hexdigest(pass + salt)
  end

  def self.authentication(email, pass)
    user = User.where(email: email).first
    if user && Digest::SHA256.hexdigest(pass + 'yy') == user.password
      return user
    end
    nil
  end

  def self.generate_auth_token
    SecureRandom.urlsafe_base64(nil, false)
  end
end
