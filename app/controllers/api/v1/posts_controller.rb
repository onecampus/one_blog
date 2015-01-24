class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    @posts = Post.all
    render json: @posts, status: :ok
  end

  def show
    render json: @post, status: :ok
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: { status: :created }, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update post_params
      render json: { status: :avatar_updated }, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @post.destroy
      render json: { status: :destroied }
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(
      :title,
      :summary,
      :content,
      :markdown,
      :author,
      :img,
      :publish_time,
      :is_recommend,
      :is_published,
      :can_comment
    )
  end
end
