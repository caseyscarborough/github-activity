class FeedController < ApplicationController
  
  Octokit.client_id = CONFIG[:github_client_id]
  Octokit.client_secret = CONFIG[:github_client_secret]

  def user
    @username = params[:username]
    @limit = params[:limit]
    begin
      @user = Octokit.user @username
      @events = events(1)
      @events.concat(events(2))
      @events.concat(events(3))
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

  def events(page)
    Octokit.user_public_events(@username, :page => page)
  end

end
