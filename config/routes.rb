GithubActivity::Application.routes.draw do
  get '/:username/:limit', to: "home#feed"
  get '/:username' , to: "home#feed"
  root to: 'home#index'
end
