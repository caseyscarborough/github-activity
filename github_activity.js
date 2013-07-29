/**
 * Github activity feed.
 *
 * Graeme Sutherland, July 2012.
 *
 * Modified by Brett Bohnenkamper, July 2013.
 * Modified by Casey Scarborough, July 2013.
 *
 * Uses .json activity from github to show public commits.
 * Requires jQuery and underscore.js
 *
 */

var GithubActivity = (function($, _) {
  var
    self = {},
    gh = 'http://github.com/',
    default_template = '\
    <div class="activity">\
      <div class="gravatar">\
        <a href="https://github.com/<%= actor %>">\
          <img src="http://gravatar.com/avatar/<%= actor_attributes.gravatar_id %>" />\
        </a>\
      </div>\
      <div class="information">\
        <a href="https://github.com/<%= actor %>"><%= actor %></a>\
        <% if (type == "PushEvent") { %>\
          pushed to <a href="<%= repository.url %>/tree/<%= payload.ref.substr(11) %>"><%= payload.ref.substr(11) %></a> \
          at <a href="<%= repository.url %>"><%= repository.name %></a>.<br />\
          <% _.each(payload.shas, function(sha) { %><br />\
            <small><a href="<%= url %>"><%= sha[0].substring(0, 6) %></a></small> \
            <small><%= sha[2] %></small></li><% }); %>\
        <% } else if (type == "CreateEvent") { %> \
          created branch <a href="<%= repository.url %>/tree/<%= payload.ref %>"> \
          <%= payload.ref %></a> at <a href="<%= repository.url %>"><%= repository.name %></a>. \
        <% } else if (type == "DeleteEvent") { %>\
          deleted branch <a href="<%= repository.url %>/tree/<%= payload.ref %>"> \
          <%= payload.ref %></a> at <a href="<%= repository.url %>"><%= repository.name %></a>.\
        <% } else if (type == "ForkEvent") { %>\
          forked <a href="<%= repository.url %>"><%= repository.owner %>/<%= repository.name %></a> to \
          <a href="<%= url %>"><%= actor %>/<%= repository.name %></a>. \
        <% } else if (type == "PullRequestEvent") { %>\
          <%= payload.action %> pull request <a href="<%= payload.pull_request.html_url %>">\
            <%= payload.pull_request.base.repo.full_name %>#<%= payload.pull_request.number %></a>.<br /><br />\
            <small><%= payload.pull_request.title %></small>\
        <% } else if (type == "PullRequestReviewCommentEvent") { %>\
          commented on pull request for <a href="<%= url %>"><%= repository.owner %>/<%= repository.name %></a>.<br />\
          <small><%= payload.comment.body %></small>\
        <% } else if (type == "IssueCommentEvent") { %>\
          <a href="<%= url %>">commented</a> regarding <a href="<%= repository.url %>">\
            <%= actor %>/<%= repository.name %>.</a>\
        <% } else if (type == "WatchEvent") { %>\
          starred <a href="<%= url %>"><%= repository.owner %>/<%= repository.name %></a>.\
        <% } else if (type == "FollowEvent") { %>\
          started following <a href="<%= url %>"><%= payload.target.login %></a>.\
        <% } else if (type == "MemberEvent") { %>\
          added <a href="<%= payload.member.html_url %>"><%= payload.member.login %></a> to \
          <a href="<%= repository.url %>"><%= repository.owner %>/<%= repository.name %></a>.\
        <% } else if (type == "GollumEvent") { %>\
          <%= payload.pages[0].action %> the <a href="<%= repository.url %>"><%= repository.owner %>/<%= repository.name %></a> wiki.\
        <% } else if (type == "GistEvent") { %>\
          <%= payload.action %>d gist: <a href="<%= payload.url %>">\
          <%= payload.desc %></a>.\
        <% } %><br />\
        <span class="muted"><small><% print($.timeago(created_at)); %></span></small><br />\
      </div><div class="clear"></div>\
    </div>';
/**
 * Fill in activity into selector from public events for username,
 * with optional template selector tmpl_selector.
 */
  self.show_activity = function(username, selector, items, tmpl_selector) {
    var 
      url = 'https://github.com/' + username + '.json?callback=?',
      template = $(tmpl_selector).html() || default_template,
      limit = items || '5',
      compiled = _.template(template);

    $.getJSON(url, {}, function(data) {
      $.each(data.slice(0, limit), function(index, commit) {
        $(selector).append(compiled(commit));
      });
    });
  };
  return self;
}(jQuery, _));

function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
  );
}