class FeedController < ApplicationController
  
  Octokit.client_id = CONFIG[:github_client_id]
  Octokit.client_secret = CONFIG[:github_client_secret]

  def user
    @username = params[:username]
    @limit = params[:limit]
    begin
      @user = Octokit.user @username
      @events = Octokit.user_public_events(@username)
    rescue
      flash.now[:error] = "#{params[:username]} does not exist."
    end
  end

  # This action lists repositories for a specified user.
  def repos
    @username = params[:username]
    @limit = params[:limit]
    begin
      @user = Octokit.user @username
      @repos = Octokit.repositories(@username).sort_by! { |r| r.pushed_at }.reverse
    rescue
      flash.now[:error] = "#{params[:username]} does not exist."
    end
  end

end
