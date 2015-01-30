# @author FuSheng Yang
class Api::V1::UsersController < ApplicationController

  before_action :set_user, only: [:show, :update_avatar,
                                  :update_pass, :destroy]

  def index
		page = params[:page]
		per_page = params[:per_page]
		offset = params[:offset]
    @users = User.page(page).per(per_page).padding(offset)
    render json: @users, status: :ok
  end

  def show
    render json: @user, status: :ok
  end

  def create
    @user = User.new(user_params)
    @user.password = User.hash_password @user.password
    if @user.save
      render json: { status: :created }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_avatar
    if @user.update user_params
      render json: { status: :avatar_updated }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_pass
    @user.password = User.hash_password user_params[:password]
    if @user.save
      render json: { status: :password_updated }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      render json: { status: :destroied }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :avatar)
  end
end
