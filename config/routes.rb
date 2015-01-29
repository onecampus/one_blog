Rails.application.routes.draw do
  root 'blog#index'

  get "api/v1/ping" => "application#ping"

  get 'users' => 'blog#index_user', as: :index_user

  get '/api' => redirect('/swagger-ui/dist/index.html?url=/apidoc/v1/api-docs.json')
  namespace :api do
    namespace :v1 do
      get 'users' => 'users#index', as: :index_user_api
      match 'users/create', to: 'users#create', via: :post
      match 'users/:id/avatar/update', to: 'users#update_avatar', via: :post
      match 'users/:id/password/update', to: 'users#update_pass', via: :put
      match 'users/:id/destroy', to: 'users#destroy', via: :delete

      post 'login' => 'users#login'
      delete 'logout' => 'users#logout'
      get 'login' => 'users#login_page', as: :login_page

      post 'auth' => 'auth#authenticate'

      resources :posts, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
