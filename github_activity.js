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
        <% if (type == "PushEvent" || type == "DeleteEvent") { %>\
          pushed to <a href="<%= repository.url %>"><%= repository.name %></a> \
          <% print($.timeago(repository.pushed_at)); %>.<br />\
          <% _.each(payload.shas, function(sha) { %><br />\
            <small><a href="<%= url %>"><%= sha[0].substring(0, 6) %></a></small><br />\
            <small><%= sha[2] %></small></li><% }); %><br />\
        <% } else if (type == "GistEvent") { %> \
          <%= payload.action %>d gist: <a href="<%= payload.url %>">\
          <%= payload.desc %></a>.\
        <% } else if (type == "CreateEvent") { %> \
          created branch <a href="<%= repository.url %>/tree/<%= payload.ref %>"> \
          <%= payload.ref %></a> at <a href="<%= repository.url %>"><%= repository.name %></a>. \
        <% } %>\
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