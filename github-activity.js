var publicEventTemplate = '
  <i class="fa {{iconClass}}"></i><a href="{{githubUrl}}/{{actor.login}}">{{actor.login}}</a> <strong>open sourced</strong>\
  <a href="{{githubUrl}}/{{repo.name}}">{{repo.name}}</a>';

function getIconFor(eventType) {
  switch(eventType) {
    case 'PublicEvent':
      return 'fa-globe'; break;
  }
}

function getMessageFor(data) {
  data.githubUrl = 'https://github.com';
  data.iconClass = getIconFor(data.type);

  switch(data.type) {
    case 'PublicEvent':
      return Mustache.render(publicEventTemplate, data); break; 
  }
}

var GitHubActivity = (function() {
  this.feed = function(username, targetSelector) {
    $.getJSON('https://api.github.com/users/' + username + '/events', function(data) {
      $.each(data, function(i, d) {
        var rendered = getMessageFor(d)
        $(targetSelector).append(rendered);
      });
    });
  }
  return this;
})();