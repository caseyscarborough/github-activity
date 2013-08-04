GithubActivity::Application.routes.draw do
  get '/:username/:limit', to: "home#feed"
  get '/:username' , to: "home#feed"
  get '/', to: "home#index"

  root to: 'home#index'
end
