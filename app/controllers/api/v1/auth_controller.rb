class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_request
  before_action :login_params
  def authenticate
    email = login_params[:email]
    pass = login_params[:password]
    user = User.authentication(email, pass)
    if user
      if user.expiration_time.to_i <= Time.now.to_i
        user.expiration_time = DateTime.now + 10.days
        user.save!
      end
      render json: { auth_token: user.auth_token, expiration_time: user.expiration_time }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end
end
