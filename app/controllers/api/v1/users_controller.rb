##
# Author:: FuSheng Yang (mailto:sysuyangkang@gmail.com)
# Copyright:: Copyright (c) 2015 thecampus.cc
# License:: Distributes under the same terms as Ruby
# Api of users
class Api::V1::UsersController < ApplicationController

  before_action :set_user, only: [:show, :update_avatar,
                                  :update_pass, :destroy]

  def index
		page = params[:page]
		per_page = params[:per_page]
		offset = params[:offset]
    @users = User.page(page).per(per_page).padding(offset).order('id DESC')
    render json: { status: 'success', data: { users: @users, total_count: User.all.count }, msg: '' }, status: :ok
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

  def ajax_img_upload
    image = AvatarUploader.new
    image.store!(params[:file])
    return_hash = {
      state: 'success',
      url: image.url,
      title: image.filename
    }
    render json: return_hash, status: :ok
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
