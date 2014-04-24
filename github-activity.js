var templates = {
  'Activity':    '<div class="activity">\
                    <div class="activity-icon"><i class="fa {{icon}}"></i></div>\
                    <div class="message">{{{message}}}</div>\
                    <div class="clear"></div>\
                  </div>',
  'UserHeader':  '<div class="header">\
                    <div class="github-icon"><i class="fa fa-github"></i></div>\
                    <div class="user-info">{{{userNameLink}}}<p>{{{userLink}}}</p></div>\
                    <div class="gravatar">{{{gravatarLink}}}</div>\
                  </div>\
                  <div class="push"></div>',
  'CreateEvent': '<div class="single-line-small">\
                    {{{userLink}}} created branch <a href="{{githubUrl}}/{{repo.name}}/tree/{{branch}}">{{branch}}</a> at {{{repoLink}}}\
                  </div>',
  'ForkEvent':   '<div class="single-line-small">\
                    {{{userLink}}} forked {{{repoLink}}} to\
                    <a href="{{githubUrl}}/{{payload.forkee.full_name}}">{{payload.forkee.full_name}}</a>\
                  </div>',
  'IssueCommentEvent': '{{{userLink}}} commented on issue {{{issueLink}}}<br>{{{smallGravatar}}}<small>{{{comment}}}</small>',
  'PublicEvent': '<div class="single-line">{{{userLink}}} open sourced {{{repoLink}}}</div>',
  'PushEvent':   '{{{userLink}}} pushed to {{{branchLink}}} at {{{repoLink}}}\
                  <ul>\
                    {{#payload.commits}}\
                    <li><small><a class="sha" href="{{githubUrl}}/{{repo.name}}/commit/{{sha}}">{{shortSha}}</a> {{message}}</small></li>\
                    {{/payload.commits}}\
                  </ul>',
  'WatchEvent':  '<div class="single-line-small">{{{userLink}}} starred {{{repoLink}}}</div>'
};

var icons = {
  'CreateEvent': 'fa-plus small',
  'ForkEvent': 'fa-code-fork small',
  'IssueCommentEvent': 'fa-comments',
  'PublicEvent': 'fa-globe',
  'PushEvent': 'fa-arrow-circle-o-up',
  'WatchEvent': 'fa-star small'
}

function getMessageFor(data) {
  data.githubUrl = "https://github.com"
  data.userLink = Mustache.render('<a href="https://github.com/{{username}}">{{username}}</a>', { "username": data.actor.login });
  data.repoLink = Mustache.render('<a href="https://github.com/{{repo}}">{{repo}}</a>', { "repo": data.repo.name });
  data.smallGravatar = Mustache.render('<img src="{{url}}" class="gravatar-small">', { "url": data.actor.avatar_url });

  // Get the branch name if it exists.
  if (data.payload.ref) {
    if (data.payload.ref.substring(0, 11) === 'refs/heads/') {
      data.branch = data.payload.ref.substring(11);
    } else {
      data.branch = data.payload.ref;
    }
    data.branchLink = Mustache.render('<a href="https://github.com/{{repo.name}}/tree/{{branch}}">{{branch}}</a>', { "branch": data.branch });
  }

  // Only show the first 6 characters of the SHA of each commit if given.
  if (data.payload.commits) {
    $.each(data.payload.commits, function(i, d) {
      d.shortSha = d.sha.substring(0, 6);
    });
  }

  if (data.payload.issue) {
    data.issueLink = Mustache.render('<a href="{{url}}">{{issue}}</a>', { "url": data.payload.issue.html_url, issue: data.repo.name + "#" + data.payload.issue.number });
  }

  // Get the comment if one exists, and trim it to 150 characters.
  if (data.payload.comment && data.payload.comment.body) {
    data.comment = data.payload.comment.body;
    if (data.comment.length > 150) {
      data.comment = data.comment.substring(0, 150) + '...';
    }
  }

  var message = Mustache.render(templates[data.type], data);
  var activity = { "message": message, "icon": icons[data.type] };

  return Mustache.render(templates['Activity'], activity);
}

var GitHubActivity = (function() {
  this.feed = function(username, targetSelector) {
    
    $.getJSON('https://api.github.com/users/' + username, function(data) {
      data.userNameLink = Mustache.render('<a href="{{url}}">{{name}}</a>', { "url": data.html_url, "name": data.name });
      data.userLink = Mustache.render('<a href="{{url}}">{{username}}</a>', { "url": data.html_url, "username": data.login });
      data.gravatarLink = Mustache.render('<a href="{{url}}"><img src="{{gravatarUrl}}"></a>', { "url": data.html_url, "gravatarUrl": data.avatar_url });

      var rendered = Mustache.render(templates['UserHeader'], data);
      $(targetSelector).append(rendered);
    });

    $.getJSON('https://api.github.com/users/' + username + '/events', function(data) {
      $.each(data, function(i, d) {
        var rendered = getMessageFor(d)
        $(targetSelector).append(rendered);
      });
    });
  }
  return this;
})();