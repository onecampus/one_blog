class Api::V1::AuthController < ApplicationController
  def authenticate
    user = User.where(params[:email], params[:password]).first
    if user
      render json: { auth_token: user.auth_token }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end
end
