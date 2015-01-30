Rails.application.routes.draw do
  root 'application#index'
  namespace :api do
    namespace :v1 do
      get 'users' => 'users#index', as: :index_user_api
      match 'users/create', to: 'users#create', via: :post
      match 'users/:id/avatar/update', to: 'users#update_avatar', via: :post
      match 'users/:id/password/update', to: 'users#update_pass', via: :put
      match 'users/:id/destroy', to: 'users#destroy', via: :delete

      match 'auth', to: 'auth#create', via: :post

      resources :posts, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
