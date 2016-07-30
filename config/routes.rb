Rails.application.routes.draw do
  root 'welcome#index'

  #get 'random_quotes#index'
  resources :random_quotes, only: [:index]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
