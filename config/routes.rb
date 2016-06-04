Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :surveys, only: [:create, :index, :show, :update, :destroy]
    resources :questions, only: [:create, :index, :show, :update, :destroy] do
      resources :answers, only: [:index, :update, :destroy]
    end
  end

  root "static_pages#root"
end
