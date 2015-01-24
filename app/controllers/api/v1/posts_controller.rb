class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
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
