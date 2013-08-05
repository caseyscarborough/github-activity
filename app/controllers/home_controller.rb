require 'net/http'
require 'json'
require 'htmlentities'

class HomeController < ApplicationController

  Octokit.client_id = CONFIG[:github_client_id]
  Octokit.client_secret = CONFIG[:github_client_secret]

  def index
    render 'index', layout: false
  end

  def feed
    @username = params[:username]
    begin
      @user = Octokit.user @username
      @events = Octokit.user_public_events(@username)
    rescue
      flash.now[:error] = "#{params[:username]} does not exist."
    end
  end

end
