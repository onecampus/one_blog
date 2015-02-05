Rails.application.routes.draw do
  root 'application#index'
  namespace :api do
    namespace :v1 do

      match 'users/auth', to: 'auth#create', via: :post
      match 'users/destroy', to: 'auth#destroy', via: :delete

      get 'users' => 'users#index', as: :index_user_api
      match 'users/create', to: 'users#create', via: :post
      match 'users/:id/avatar/update', to: 'users#update_avatar', via: :post
      match 'users/:id/password/update', to: 'users#update_pass', via: :put
      match 'users/:id/destroy', to: 'users#destroy', via: :delete

      get 'post/tags' => 'posts#post_tags'
      match 'posts/image/uploader', to: 'posts#ajax_img_upload', via: :post
      get 'posts/search' => 'posts#search'
      resources :posts, only: [:index, :show, :create, :update, :destroy]

      get 'ueditor/uploader/index' => 'ueditor_uploader#index'
      match 'ueditor/uploader/index', to: 'ueditor_uploader#index', via: :post
    end
  end
end
