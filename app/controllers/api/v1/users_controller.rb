class Api::V1::UsersController < ApplicationController

  before_action :set_user, only: [:update_avatar, :update_pass, :destroy]

  swagger_controller :users, "User Management"

  swagger_api :index do
    summary "Fetches all User items"
    notes "This lists all the active users"
  end

  def index
    @users = User.all
    render json: @users, status: :ok
  end

  swagger_api :create do
    summary "Creates a new User"
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

  swagger_api :update_avatar do
    summary "Upload avatar"
  end

  def update_avatar
    if @user.update user_params
      render json: { status: :avatar_updated }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  swagger_api :update_pass do
    summary "Updates password of an existing User"
  end

  def update_pass
    @user.password = User.hash_password user_params[:password]
    if @user.save
      render json: { status: :password_updated }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  swagger_api :destroy do
    summary "Deletes an existing User item"
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
