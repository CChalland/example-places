Rails.application.routes.draw do

  get '/places' => 'places#index'
  post '/places' => 'places#create'
  patch '/places' => 'places#update'
  delete '/places' => 'places#destroy'

end
