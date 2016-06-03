Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :surveys, only: [:create, :index, :show, :update, :destroy]
    resources :questions, only: [:create, :index, :show, :update, :destroy]
  end

  root "static_pages#root"
end
