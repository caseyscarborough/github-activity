var templates = {
  'Activity':    '<div class="activity">\
                    <div class="activity-icon"><i class="fa {{icon}}"></i></div>\
                    <div class="message">{{{message}}}</div>\
                  </div>\
                  <div class="clear">',
  'CreateEvent': '<div class="single-line-small">\
                    <a href="{{githubUrl}}/{{actor.login}}">{{actor.login}}</a> created branch\
                    <a href="{{githubUrl}}/{{repo.name}}/tree/{{branch}}">{{branch}}</a> at\
                    <a href="{{githubUrl}}/{{repo.name}}">{{repo.name}}</a>\
                  </div>',
  'PublicEvent': '<div class="single-line">\
                    <a href="{{githubUrl}}/{{actor.login}}">{{actor.login}}</a> open sourced\
                    <a href="{{githubUrl}}/{{repo.name}}">{{repo.name}}</a>\
                  </div>',
  'PushEvent':   '<a href="{{githubUrl}}/{{actor.login}}">{{actor.login}}</a> pushed to\
                  <a href="{{githubUrl}}/{{repo.name}}/tree/{{branch}}">{{branch}}</a> at\
                  <a href="{{githubUrl}}/{{repo.name}}">{{repo.name}}</a>\
                  <ul>\
                    {{#payload.commits}}\
                    <li><small><a class="sha" href="{{githubUrl}}/{{repo.name}}/commit/{{sha}}">{{shortSha}}</a> {{message}}</small></li>\
                    {{/payload.commits}}\
                  </ul>'
};

var icons = {
  'PublicEvent': 'fa-globe',
  'PushEvent':   'fa-arrow-circle-o-up',
  'CreateEvent': 'fa-plus'
}

function getMessageFor(data) {
  data.githubUrl = 'https://github.com';

  if (data.payload.ref) {
    if (data.payload.ref.substring(0,10) === 'refs/heads/') {
      data.branch = data.payload.ref.substring(11);
    } else {
      data.branch = data.payload.ref;
    }
  }

  // Only show the first 6 characters of the SHA of each commit if given.
  if (data.payload.commits) {
    $.each(data.payload.commits, function(i, d) {
      d.shortSha = d.sha.substring(0,6);
    });
  }

  var message = Mustache.render(templates[data.type], data);
  var activity = { "message": message, "icon": icons[data.type] };

  return Mustache.render(templates['Activity'], activity);
}

var GitHubActivity = (function() {
  this.feed = function(username, targetSelector) {
    $.getJSON('https://api.github.com/users/' + username + '/events?client_id=4c37e445b8ed8635dbcc&client_secret=a3152ff17d859f138428abb51cd78df425dbea28', function(data) {
      $.each(data, function(i, d) {
        var rendered = getMessageFor(d)
        $(targetSelector).append(rendered);
      });
    });
  }
  return this;
})();