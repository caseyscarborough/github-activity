GithubActivity::Application.routes.draw do
  get '/:username/repos/:limit', to: "feed#repos"
  get '/:username/repos', to: "feed#repos"
  get '/:username/:limit', to: "feed#user"
  get '/:username' , to: "feed#user"
  root to: 'home#index'
end
