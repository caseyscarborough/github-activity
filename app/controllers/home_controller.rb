require 'net/http'
require 'json'
require 'htmlentities'

class HomeController < ApplicationController

  def index
  end

  def feed
    @username, @limit = params[:username], params[:limit]
    @user_data = JSON.parse(Net::HTTP.get_response(URI.parse("https://api.github.com/users/#{@username}")).body)
    @event_data = JSON.parse(Net::HTTP.get_response(URI.parse("https://api.github.com/users/#{@username}/events")).body)
  end

end
