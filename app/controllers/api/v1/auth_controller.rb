# auth
# @author FuSheng Yang
class Api::V1::AuthController < ApplicationController
	skip_before_action :authenticate_request
	def create
		user = User.authentication(login_params[:email], login_params[:password])
		if user
			touch_exp_time user
			render json: { auth_token: user.auth_token,
			expiration_time: user.expiration_time }
		else
			render json: { error: 'Invalid email or password' }, status: :unauthorized
		end
	end

	private

	def login_params
		params.require(:login).permit(:email, :password)
	end

	def touch_exp_time(user)
		return unless user.expiration_time.to_i <= Time.now.to_i
		user.expiration_time = DateTime.now + 10.days
		user.save!
	end
end
