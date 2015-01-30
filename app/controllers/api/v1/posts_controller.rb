class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def index
		page = params[:page]
		per_page = params[:per_page]
		offset = params[:offset]
    @posts = Post.page(page).per(per_page).padding(offset)
    render json: @posts, status: :ok
  end

  def show
    render json: @post, status: :ok
  end

  def create
    @post = Post.new(post_params)
    unless post_params[:content].blank?
      post_params[:markdown] = nil
    else
      post_params[:content] = nil
    end
		@post.publish_time = Time.now
    if @post.save
			@post.reload
      render json: { status: :created }, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update post_params
      render json: { status: :updated }, status: :ok
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
      :is_recommend,
      :is_published,
      :can_comment,
			:tag_list
    )
  end
end
