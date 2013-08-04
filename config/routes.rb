GithubActivity::Application.routes.draw do
  get '/test/:username', to: "home#test"
  get '/:username/:limit', to: "home#feed"
  get '/:username' , to: "home#feed"
  root to: 'home#index'
end
