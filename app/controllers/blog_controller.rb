class BlogController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do
    render :record_not_found
  end

  def index
    if current_user
      @posts = current_user.posts
    else
      @posts = Post.all
    end
  end

  def index_user
    @users = User.all
  end
end
