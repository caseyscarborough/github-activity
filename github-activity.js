var templates = {
  'Activity': '<div class="activity">\
                 <div class="activity-icon"><i class="fa {{icon}}"></i></div>\
                 <div class="message"><div class="time">{{{timeString}}}</div>{{{message}}}</div>\
                 <div class="clear"></div>\
               </div>',
  'UserHeader': '<div class="header">\
                   <div class="github-icon"><i class="fa fa-github"></i></div>\
                   <div class="user-info">{{{userNameLink}}}<p>{{{userLink}}}</p></div>\
                   <div class="gravatar">{{{gravatarLink}}}</div>\
                 </div><div class="push"></div>',
  'Footer':     '<div class="footer">Public Activity <a href="https://github.com/caseyscarborough/github-activity" target="_blank">GitHub Activity Stream</a>',
  'CommitCommentEvent': '{{{userLink}}} commented on commit {{{commentLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>',
  'CreateEvent': '<div class="single-line-small">{{{userLink}}} created {{payload.ref_type}} {{{branchLink}}}{{{repoLink}}}</div>',
  'DeleteEvent': '<div class="single-line-small">{{{userLink}}} deleted {{payload.ref_type}} {{payload.ref}} at {{{repoLink}}}</div>',
  'ForkEvent': '<div class="single-line-small">{{{userLink}}} forked {{{repoLink}}} to<a href="{{githubUrl}}/{{payload.forkee.full_name}}">{{payload.forkee.full_name}}</a></div>',
  'IssueCommentEvent': '{{{userLink}}} commented on {{issueType}} {{{issueLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>',
  'IssuesEvent': '{{{userLink}}} {{payload.action}} issue {{{issueLink}}}<br>{{{userGravatar}}}<small>{{payload.issue.title}}</small>',
  'PublicEvent': '<div class="single-line">{{{userLink}}} open sourced {{{repoLink}}}</div>',
  'PullRequestEvent': '{{{userLink}}} {{payload.action}} pull request {{{pullRequestLink}}}<br>{{{userGravatar}}}<small>{{payload.pull_request.title}}</small>{{{mergeMessage}}}',
  'PullRequestReviewCommentEvent': '{{{userLink}}} commented on pull request {{{pullRequestLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>',  
  'PushEvent': '{{{userLink}}} pushed to {{{branchLink}}}{{{repoLink}}}<br>{{{userGravatar}}}\
                <ul class="commits">{{#payload.commits}}\
                  <li><small>{{{committerGravatar}}} {{{shaLink}}} {{message}}</small></li>{{/payload.commits}}\
                </ul>{{{commitsMessage}}}',
  'ReleaseEvent': '{{{userLink}}} released {{{tagLink}}} at {{{repoLink}}}<br>{{{userGravatar}}}<small><i class="fa fa-download"></i>  {{{zipLink}}}',
  'WatchEvent': '<div class="single-line-small">{{{userLink}}} starred {{{repoLink}}}</div>'
};

var icons = {
  'CommitCommentEvent': 'fa-comments',
  'CreateEvent': 'fa-plus small',
  'DeleteEvent': 'fa-trash-o small',
  'ForkEvent': 'fa-code-fork small',
  'IssuesEvent': 'fa-check-circle-o',
  'IssueCommentEvent': 'fa-comments',
  'PublicEvent': 'fa-globe',
  'PullRequestEvent': 'fa-reply',
  'PullRequestReviewCommentEvent': 'fa-comments',
  'PushEvent': 'fa-arrow-circle-o-up',
  'ReleaseEvent': 'fa-tags',
  'WatchEvent': 'fa-star small'
}

/** MD5 methods written by Joseph Myers. http://www.myersdaily.org/joseph/javascript/md5-text.html */
function md5cycle(f,h){var g=f[0],e=f[1],j=f[2],i=f[3];g=ff(g,e,j,i,h[0],7,-680876936);i=ff(i,g,e,j,h[1],12,-389564586);j=ff(j,i,g,e,h[2],17,606105819);e=ff(e,j,i,g,h[3],22,-1044525330);g=ff(g,e,j,i,h[4],7,-176418897);i=ff(i,g,e,j,h[5],12,1200080426);j=ff(j,i,g,e,h[6],17,-1473231341);e=ff(e,j,i,g,h[7],22,-45705983);g=ff(g,e,j,i,h[8],7,1770035416);i=ff(i,g,e,j,h[9],12,-1958414417);j=ff(j,i,g,e,h[10],17,-42063);e=ff(e,j,i,g,h[11],22,-1990404162);g=ff(g,e,j,i,h[12],7,1804603682);i=ff(i,g,e,j,h[13],12,-40341101);j=ff(j,i,g,e,h[14],17,-1502002290);e=ff(e,j,i,g,h[15],22,1236535329);g=gg(g,e,j,i,h[1],5,-165796510);i=gg(i,g,e,j,h[6],9,-1069501632);j=gg(j,i,g,e,h[11],14,643717713);e=gg(e,j,i,g,h[0],20,-373897302);g=gg(g,e,j,i,h[5],5,-701558691);i=gg(i,g,e,j,h[10],9,38016083);j=gg(j,i,g,e,h[15],14,-660478335);e=gg(e,j,i,g,h[4],20,-405537848);g=gg(g,e,j,i,h[9],5,568446438);i=gg(i,g,e,j,h[14],9,-1019803690);j=gg(j,i,g,e,h[3],14,-187363961);e=gg(e,j,i,g,h[8],20,1163531501);g=gg(g,e,j,i,h[13],5,-1444681467);i=gg(i,g,e,j,h[2],9,-51403784);j=gg(j,i,g,e,h[7],14,1735328473);e=gg(e,j,i,g,h[12],20,-1926607734);g=hh(g,e,j,i,h[5],4,-378558);i=hh(i,g,e,j,h[8],11,-2022574463);j=hh(j,i,g,e,h[11],16,1839030562);e=hh(e,j,i,g,h[14],23,-35309556);g=hh(g,e,j,i,h[1],4,-1530992060);i=hh(i,g,e,j,h[4],11,1272893353);j=hh(j,i,g,e,h[7],16,-155497632);e=hh(e,j,i,g,h[10],23,-1094730640);g=hh(g,e,j,i,h[13],4,681279174);i=hh(i,g,e,j,h[0],11,-358537222);j=hh(j,i,g,e,h[3],16,-722521979);e=hh(e,j,i,g,h[6],23,76029189);g=hh(g,e,j,i,h[9],4,-640364487);i=hh(i,g,e,j,h[12],11,-421815835);j=hh(j,i,g,e,h[15],16,530742520);e=hh(e,j,i,g,h[2],23,-995338651);g=ii(g,e,j,i,h[0],6,-198630844);i=ii(i,g,e,j,h[7],10,1126891415);j=ii(j,i,g,e,h[14],15,-1416354905);e=ii(e,j,i,g,h[5],21,-57434055);g=ii(g,e,j,i,h[12],6,1700485571);i=ii(i,g,e,j,h[3],10,-1894986606);j=ii(j,i,g,e,h[10],15,-1051523);e=ii(e,j,i,g,h[1],21,-2054922799);g=ii(g,e,j,i,h[8],6,1873313359);i=ii(i,g,e,j,h[15],10,-30611744);j=ii(j,i,g,e,h[6],15,-1560198380);e=ii(e,j,i,g,h[13],21,1309151649);g=ii(g,e,j,i,h[4],6,-145523070);i=ii(i,g,e,j,h[11],10,-1120210379);j=ii(j,i,g,e,h[2],15,718787259);e=ii(e,j,i,g,h[9],21,-343485551);f[0]=add32(g,f[0]);f[1]=add32(e,f[1]);f[2]=add32(j,f[2]);f[3]=add32(i,f[3])}function cmn(h,e,d,c,g,f){e=add32(add32(e,h),add32(c,f));return add32((e<<g)|(e>>>(32-g)),d)}function ff(g,f,k,j,e,i,h){return cmn((f&k)|((~f)&j),g,f,e,i,h)}function gg(g,f,k,j,e,i,h){return cmn((f&j)|(k&(~j)),g,f,e,i,h)}function hh(g,f,k,j,e,i,h){return cmn(f^k^j,g,f,e,i,h)}function ii(g,f,k,j,e,i,h){return cmn(k^(f|(~j)),g,f,e,i,h)}function md51(c){txt="";var e=c.length,d=[1732584193,-271733879,-1732584194,271733878],b;for(b=64;b<=c.length;b+=64){md5cycle(d,md5blk(c.substring(b-64,b)))}c=c.substring(b-64);var a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(b=0;b<c.length;b++){a[b>>2]|=c.charCodeAt(b)<<((b%4)<<3)}a[b>>2]|=128<<((b%4)<<3);if(b>55){md5cycle(d,a);for(b=0;b<16;b++){a[b]=0}}a[14]=e*8;md5cycle(d,a);return d}function md5blk(b){var c=[],a;for(a=0;a<64;a+=4){c[a>>2]=b.charCodeAt(a)+(b.charCodeAt(a+1)<<8)+(b.charCodeAt(a+2)<<16)+(b.charCodeAt(a+3)<<24)}return c}var hex_chr="0123456789abcdef".split("");function rhex(c){var b="",a=0;for(;a<4;a++){b+=hex_chr[(c>>(a*8+4))&15]+hex_chr[(c>>(a*8))&15]}return b}function hex(a){for(var b=0;b<a.length;b++){a[b]=rhex(a[b])}return a.join("")}function md5(a){return hex(md51(a))}function add32(d,c){return(d+c)&4294967295}if(md5("hello")!="5d41402abc4b2a76b9719d911017c592"){function add32(a,d){var c=(a&65535)+(d&65535),b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}};

function millisecondsToStr(milliseconds) {
    function numberEnding (number) {
        return (number > 1) ? 's ago' : ' ago';
    }
    var temp = Math.floor(milliseconds / 1000);

    var years = Math.floor(temp / 31536000);
    if (years) return years + ' year' + numberEnding(years);

    var months = Math.floor((temp %= 31536000) / 2592000);
    if (months) return months + ' month' + numberEnding(months);

    var days = Math.floor((temp %= 2592000) / 86400);
    if (days) return days + ' day' + numberEnding(days);

    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) return 'about ' + hours + ' hour' + numberEnding(hours);

    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) return minutes + ' minute' + numberEnding(minutes);

    var seconds = temp % 60;
    if (seconds) return seconds + ' second' + numberEnding(seconds);

    return 'just now';
}

function pluralize(word, number) {
  // Yeah I know, this sucks.
  if (number !== 1) return word + 's';
  return word;
}

function renderLink(url, title, cssClass) {
  return Mustache.render('<a class="' + cssClass + '" href="{{url}}">{{{title}}}</a>', { url: url, title: title });
}

function renderGitHubLink(url, title, cssClass) {
  if (!title) title = url;
  if (typeof(cssClass) === 'undefined') cssClass = "";
  return renderLink('https://github.com/' + url, title, cssClass);
}

function getMessageFor(data) {
  data.githubUrl = "https://github.com"
  data.userLink = renderGitHubLink(data.actor.login);
  data.repoLink = renderGitHubLink(data.repo.name);
  data.userGravatar = Mustache.render('<div class="gravatar-user"><img src="{{url}}" class="gravatar-small"></div>', { url: data.actor.avatar_url });

  // Get the branch name if it exists.
  if (data.payload.ref) {
    if (data.payload.ref.substring(0, 11) === 'refs/heads/') {
      data.branch = data.payload.ref.substring(11);
    } else {
      data.branch = data.payload.ref;
    }
    data.branchLink = renderGitHubLink(data.repo.name + '/tree/' + data.branch, data.branch) + ' at ';
  }

  // Only show the first 6 characters of the SHA of each commit if given.
  if (data.payload.commits) {
    var shaDiff = data.payload.before + '...' + data.payload.head
    var length = data.payload.commits.length;
    if (length === 2) {
      // If there are 2 commits, show message 'View comparison for these 2 commits >>'
      data.commitsMessage = Mustache.render('<small class="message-commits"><a href="https://github.com/{{repo}}/compare/{{shaDiff}}">View comparison for these 2 commits &raquo;</a>', { repo: data.repo.name, shaDiff: shaDiff });
    } else if (length > 2) {
      // If there are more than two, show message '(numberOfCommits - 2) more commits >>'
      data.commitsMessage = Mustache.render('<small class="message-commits"><a href="https://github.com/{{repo}}/compare/{{shaDiff}}">{{length}} more ' + pluralize('commit', length - 2) + ' &raquo;</a>', { repo: data.repo.name, shaDiff: shaDiff, length: data.payload.size - 2 });
    }

    $.each(data.payload.commits, function(i, d) {
      if (d.message.length > 66) {
        d.message = d.message.substring(0, 66) + '...';
      }
      if (i < 2) {
        d.shaLink = renderGitHubLink(data.repo.name + '/commit/' + d.sha, d.sha.substring(0, 6), 'sha');
        d.committerGravatar = Mustache.render('<img class="gravatar-commit" src="https://gravatar.com/avatar/{{hash}}?s=30&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="16" />', { hash: md5(d.author.email) });
      } else {
        // Delete the rest of the commits after the first 2, and then break out of the each loop.
        data.payload.commits.splice(2, data.payload.size);
        return false;
      }
    });
  }

  // Get the link if this is an IssueEvent.
  if (data.payload.issue) {
    var title = data.repo.name + "#" + data.payload.issue.number;
    data.issueLink = renderLink(data.payload.issue.html_url, title);
    data.issueType = "issue";
    if (data.payload.issue.pull_request) {
      data.issueType = "pull request";
    }
  }

  // Retrieve the pull request link if this is a PullRequestEvent.
  if (data.payload.pull_request) {
    var pr = data.payload.pull_request
    data.pullRequestLink = renderLink(data.payload.html_url, data.repo.name + "#" + pr.number);
    data.mergeMessage = "";

    // If this was a merge, set the merge message.
    if (data.payload.pull_request.merged) {
      data.payload.action = "merged";
      var message = '{{c}} ' + pluralize('commit', pr.commits) + ' with {{a}} ' + pluralize('addition', pr.additions) + ' and {{d}} ' + pluralize('deletion', pr.deletions);
      data.mergeMessage = Mustache.render('<br><small class="message-merge">' + message + '</small>', { c: pr.commits, a: pr.additions, d: pr.deletions })
    }
  }

  // Get the link if this is a PullRequestReviewCommentEvent
  if (data.payload.comment && data.payload.comment.pull_request_url) {
    var title = data.repo.name + "#" + data.payload.comment.pull_request_url.split('/').pop();
    data.pullRequestLink = renderGitHubLink(data.payload.comment.pull_request_url, title);
  }

  // Get the comment if one exists, and trim it to 150 characters.
  if (data.payload.comment && data.payload.comment.body) {
    data.comment = data.payload.comment.body;
    if (data.comment.length > 150) {
      data.comment = data.comment.substring(0, 150) + '...';
    }
    if (data.payload.comment.html_url && data.payload.comment.commit_id) {
      var title = data.repo.name + '@' + data.payload.comment.commit_id.substring(0, 10);
      data.commentLink = renderLink(data.payload.comment.html_url, title);
    }
  }

  if (data.type === 'ReleaseEvent') {
    data.tagLink = renderLink(data.payload.release.html_url, data.payload.release.tag_name);
    data.zipLink = renderLink(data.payload.release.zipball_url, 'Download Source Code (zip)');
  }

  var message = Mustache.render(templates[data.type], data);
  var timeString = millisecondsToStr(new Date() - new Date(data.created_at));
  var activity = { message: message, icon: icons[data.type], timeString: timeString };

  return Mustache.render(templates['Activity'], activity);
}

var GitHubActivity = (function() {
  this.feed = function(options) {
    if (!options.username || !options.selector) {
      return false;
    }
    var selector = options.selector;
    $(selector).html('');

    var userUrl   = 'https://api.github.com/users/' + options.username;
    var eventsUrl = userUrl + '/events';

    if (options.clientId && options.clientSecret) {
      var authString = '?client_id=' + options.clientId + '&client_secret=' + options.clientSecret;
      userUrl   += authString;
      eventsUrl += authString
    }
    
    $.getJSON(userUrl, function(data) {
      data.userNameLink = renderLink(data.html_url, data.name);
      data.userLink = renderLink(data.html_url, data.login);
      data.gravatarLink = renderLink(data.html_url, '<img src="' + data.avatar_url + '">');

      var rendered = Mustache.render(templates['UserHeader'], data);
      $(selector).append(rendered);
    }).done(function() {
      $.getJSON(eventsUrl, function(data) {
        $.each(data, function(i, d) {
          var rendered = getMessageFor(d)
          $(selector).append(rendered);
        });
      }).done(function() {
        $(selector).css('position', 'relative');
        $(selector).wrapInner('<div class="github-activity-feed"></div>');
        $('.github-activity-feed').append('<div class="push-small"></div>' + templates['Footer']);
        $('.single-line-small').prev().css('display', 'none');
      });
    });
  }
  return this;
})();