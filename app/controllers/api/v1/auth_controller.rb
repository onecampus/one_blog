class Api::V1::AuthController < ApplicationController
  def authenticate
    user = User.where(params[:email], params[:password]).first
    if user
      if user.expiration_time.to_i <= Time.now.to_i
        user.expiration_time = DateTime.now + 10.days
        user.save!
      end
      render json: { auth_token: user.auth_token, expiration_time: user.expiration_time }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end
end
