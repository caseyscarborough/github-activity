require 'net/http'
require 'json'
require 'htmlentities'

class HomeController < ApplicationController

  def index
    render 'index', layout: false
  end

  def feed
    @username = params[:username]
    Octokit.client_id = CONFIG[:github_client_id]
    Octokit.client_secret = CONFIG[:github_client_secret]
    @user = Octokit.user @username
    @events = Octokit.user_public_events(@username)
  end

end
