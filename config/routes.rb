Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :surveys, only: [:create, :index, :show, :update, :destroy]
    resources :questions, only: [:create, :index, :show, :update, :destroy]
    resources :responses, only: [:create, :update, :destroy]
  end

  get '/auth/:provider/callback', to: 'api/sessions#create'
end
