##
# Author:: FuSheng Yang (mailto:sysuyangkang@gmail.com)
# Copyright:: Copyright (c) 2015 thecampus.cc
# License:: Distributes under the same terms as Ruby
# Api of posts
class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def index
		page = params[:page]
		per_page = params[:per_page]
		offset = params[:offset]
    @posts = Post.page(page).per(per_page).padding(offset)
    render json: { status: 'success', data: { posts: @posts, total_count: Post.all.count }, msg: '' }, status: :ok
  end

  def post_tags
    query = params[:query]
    if query.blank?
      @tags = ActsAsTaggableOn::Tagging.includes(:tag).where(context: 'tags').pluck(:name).uniq
    else
      @tags = ActsAsTaggableOn::Tagging.where(context: 'tags').joins(:tag).where("tags.name LIKE ?", "%#{query}%").pluck(:name)
    end
    render json: { status: 'success', data: { tags: @tags }, msg: '' }, status: :ok
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

  def ajax_img_upload
    image = PostImgUploader.new
    image.store!(params[:file])
    return_hash = {
      state: 'success',
      url: image.url,
      title: image.filename
    }
    render json: return_hash, status: :ok
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
      :tag_list => []
    )
  end
end
