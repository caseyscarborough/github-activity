require "rvm/capistrano"
set :rvm_ruby_string, 'default'
require "bundler/capistrano"
 
# Set application and username
set :application, "application-name.com"
set :user, "casey"
 
set :port, 2200 # Set default SSH port for server if other than 22
set :deploy_to, "/var/www/#{application}"
set :deploy_via, :copy
set :use_sudo, false
 
# Point to application's git repository location
set :scm, :git
set :repository, "/path/to/repository/.git"
set :branch, "capistrano"
 
# Server information
role :web, "123.456.7.890"
role :app, "123.456.7.890"
role :db,  "123.456.7.890", :primary => true
role :db,  "123.456.7.890"
 
# Passenger
 
after "deploy", "deploy:bundle_gems"
after "deploy:bundle_gems", "deploy:precompile_assets"
after "deploy:precompile_assets", "deploy:restart"
 
namespace :deploy do
  # Task to run bundle install after application deployment
  task :bundle_gems do
    run "cd #{deploy_to}/current && bundle install"
  end
 
  # Task to precompile assets after application deployment
  task :precompile_assets do
    run "cd #{deploy_to}/current && RAILS_ENV=production rake assets:precompile --trace"
  end
 
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end