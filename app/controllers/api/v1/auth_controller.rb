class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_request # this will be implemented later
  def authenticate
    user = User.find_by_credentials(params[:username], params[:password]) # you'll need to implement this
    if user
      render json: { auth_token: user.generate_auth_token }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end
end
