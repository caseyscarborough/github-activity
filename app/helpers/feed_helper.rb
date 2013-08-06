module FeedHelper

  def github_link(suffix)
    "https://github.com/#{suffix}"
  end

  def convert(link)
    link.gsub(/api./, "").gsub(/\/users/, "").gsub(/\/repos/, "").gsub(/commits/, "commit")
  end 

  def gravatar_for(email)
    hash = Digest::MD5.hexdigest(email)
    "https://gravatar.com/avatar/#{hash}?s=400&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"
  end

  def icon_for(type)
    if type == "PushEvent"
      "icon-upload"
    elsif type == "ForkEvent"
      "icon-code-fork"
    elsif type == "PublicEvent"
      "icon-globe"
    elsif type == "CommentEvent" || type == "PullRequestReviewCommentEvent" || type === "IssueCommentEvent" || type === "CommitCommentEvent"
      "icon-comments"
    elsif type == "IssuesEvent"
      "icon-check"
    elsif type == "CreateEvent" || type == "MemberEvent"
      "icon-plus"
    elsif type == "DeleteEvent"
      "icon-ban-circle"
    elsif type == "WatchEvent"
      "icon-star"
    elsif type == "FollowEvent"
      "icon-male"
    elsif type == "GistEvent"
      "icon-code"
    elsif type == "PullRequestEvent"
      "icon-download"
    elsif type == "GollumEvent"
      "icon-info"
    else
      "icon-github-alt"
    end
  end

end
