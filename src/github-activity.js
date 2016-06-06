/*!
 * GitHub Activity Stream - v0.1.4 - 10/7/2015
 * https://github.com/caseyscarborough/github-activity
 *
 * Copyright (c) 2015 Casey Scarborough
 * MIT License
 * http://opensource.org/licenses/MIT
 */

var GitHubActivity = (function() {
  'use strict';

  var obj = {};

  var methods = {
    renderLink: function(url, title, cssClass) {
      if (!title) { title = url; }
      if (typeof(cssClass) === 'undefined') cssClass = "";
      return Mustache.render('<a class="' + cssClass + '" href="{{url}}" target="_blank">{{{title}}}</a>', { url: url, title: title });
    },
    renderGitHubLink: function(url, title, cssClass) {
      if (!title) { title = url; }
      if (typeof(cssClass) === 'undefined') cssClass = "";
      return methods.renderLink('https://github.com/' + url, title, cssClass);
    },
    getMessageFor: function(data) {
      var p = data.payload;
      data.repoLink = methods.renderGitHubLink(data.repo.name);
      data.userGravatar = Mustache.render('<div class="gha-gravatar-user"><img src="{{url}}" class="gha-gravatar-small"></div>', { url: data.actor.avatar_url });

      // Get the branch name if it exists.
      if (p.ref) {
        if (p.ref.substring(0, 11) === 'refs/heads/') {
          data.branch = p.ref.substring(11);
        } else {
          data.branch = p.ref;
        }
        data.branchLink = methods.renderGitHubLink(data.repo.name + '/tree/' + data.branch, data.branch) + ' at ';
      }

      // Only show the first 6 characters of the SHA of each commit if given.
      if (p.commits) {
        var shaDiff = p.before + '...' + p.head;
        var length = p.commits.length;
        if (length === 2) {
          // If there are 2 commits, show message 'View comparison for these 2 commits >>'
          data.commitsMessage = Mustache.render('<a href="https://github.com/{{repo}}/compare/{{shaDiff}}">View comparison for these 2 commits &raquo;</a>', { repo: data.repo.name, shaDiff: shaDiff });
        } else if (length > 2) {
          // If there are more than two, show message '(numberOfCommits - 2) more commits >>'
          data.commitsMessage = Mustache.render('<a href="https://github.com/{{repo}}/compare/{{shaDiff}}">{{length}} more ' + pluralize('commit', length - 2) + ' &raquo;</a>', { repo: data.repo.name, shaDiff: shaDiff, length: p.size - 2 });
        }

        p.commits.forEach(function(d, i) {
          if (d.message.length > 66) {
            d.message = d.message.substring(0, 66) + '...';
          }
          if (i < 2) {
            d.shaLink = methods.renderGitHubLink(data.repo.name + '/commit/' + d.sha, d.sha.substring(0, 6), 'gha-sha');
            d.committerGravatar = Mustache.render('<img class="gha-gravatar-commit" src="https://gravatar.com/avatar/{{hash}}?s=30&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="16" />', { hash: md5(d.author.email) });
          } else {
            // Delete the rest of the commits after the first 2, and then break out of the each loop.
            p.commits.splice(2, p.size);
            return false;
          }
        });
      }

      // Get the link if this is an IssueEvent.
      if (p.issue) {
        var title = data.repo.name + "#" + p.issue.number;
        data.issueLink = methods.renderLink(p.issue.html_url, title);
        data.issueType = "issue";
        if (p.issue.pull_request) {
          data.issueType = "pull request";
        }
      }

      // Retrieve the pull request link if this is a PullRequestEvent.
      if (p.pull_request) {
        var pr = p.pull_request;
        data.pullRequestLink = methods.renderLink(pr.html_url, data.repo.name + "#" + pr.number);
        data.mergeMessage = "";

        // If this was a merge, set the merge message.
        if (p.pull_request.merged) {
          p.action = "merged";
          var message = '{{c}} ' + pluralize('commit', pr.commits) + ' with {{a}} ' + pluralize('addition', pr.additions) + ' and {{d}} ' + pluralize('deletion', pr.deletions);
          data.mergeMessage = Mustache.render('<br><small class="gha-message-merge">' + message + '</small>', { c: pr.commits, a: pr.additions, d: pr.deletions });
        }
      }

      // Get the link if this is a PullRequestReviewCommentEvent
      if (p.comment && p.comment.pull_request_url) {
        var title = data.repo.name + "#" + p.comment.pull_request_url.split('/').pop();
        data.pullRequestLink = methods.renderGitHubLink(p.comment.pull_request_url, title);
      }

      // Get the comment if one exists, and trim it to 150 characters.
      if (p.comment && p.comment.body) {
        data.comment = p.comment.body;
        if (data.comment.length > 150) {
          data.comment = data.comment.substring(0, 150) + '...';
        }
        if (p.comment.html_url && p.comment.commit_id) {
          var title = data.repo.name + '@' + p.comment.commit_id.substring(0, 10);
          data.commentLink = methods.renderLink(p.comment.html_url, title);
        }
      }

      if (data.type === 'ReleaseEvent') {
        data.tagLink = methods.renderLink(p.release.html_url, p.release.tag_name);
        data.zipLink = methods.renderLink(p.release.zipball_url, 'Download Source Code (zip)');
      }

      // Wiki event
      if (data.type === 'GollumEvent') {
        var page = p.pages[0];
        data.actionType = page.action;
        data.message = data.actionType.charAt(0).toUpperCase() + data.actionType.slice(1) + ' ';
        data.message += methods.renderGitHubLink(page.html_url, page.title);
      }

      if (data.type === 'FollowEvent') data.targetLink = methods.renderGitHubLink(p.target.login);
      if (data.type === 'ForkEvent')   data.forkLink   = methods.renderGitHubLink(p.forkee.full_name);
      if (data.type === 'MemberEvent') data.memberLink = methods.renderGitHubLink(p.member.login);

      if (p.gist) {
        data.actionType = p.action === 'fork' ? p.action + 'ed' : p.action + 'd';
        data.gistLink = methods.renderLink(p.gist.html_url, 'gist: ' + p.gist.id);
      }

      var message = Mustache.render(templates[data.type], data);
      var timeString = millisecondsToStr(new Date() - new Date(data.created_at));
      var icon;

      if (data.type == 'CreateEvent' && (['repository', 'branch', 'tag'].indexOf(p.ref_type) >= 0)) {
        // Display separate icons depending on type of create event.
        icon = icons[data.type + '_' + p.ref_type];
      } else {
        icon = icons[data.type]
      }
      var activity = { message: message, icon: icon, timeString: timeString, userLink: methods.renderGitHubLink(data.actor.login) };

      if (singleLineActivities.indexOf(data.type) > -1) {
        return Mustache.render(templates.SingleLineActivity, activity);
      }
      return Mustache.render(templates.Activity, activity);
    },
    getHeaderHTML: function(data) {
      if (data.name) {
        data.userNameLink = methods.renderLink(data.html_url, data.name);
      } else {
        data.withoutName = ' without-name';
      }
      data.userLink = methods.renderLink(data.html_url, data.login);
      data.gravatarLink = methods.renderLink(data.html_url, '<img src="' + data.avatar_url + '">');

      return Mustache.render(templates.UserHeader, data);
    },
    getActivityHTML: function(data, limit) {
      var text = '';
      var dataLength = data.length;
      if (limit && limit > dataLength) {
        limit = dataLength;
      }
      limit = limit ? limit : dataLength;

      if (limit === 0) {
        return Mustache.render(templates.NoActivity, {});
      }
      for (var i = 0; i < limit; i++) {
        text += methods.getMessageFor(data[i]);
      }

      return text;
    },
    getOutputFromRequest: function(url, callback) {
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.setRequestHeader('Accept', 'application/vnd.github.v3+json');

      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 300){
            var data = JSON.parse(request.responseText);
            callback(undefined, data);
          } else {
            callback('request for ' + url + ' yielded status ' + request.status);
          }
        }
      };

      request.onerror = function() { callback('An error occurred connecting to ' + url); };
      request.send();
    },
    renderStream: function(output, div) {
      div.innerHTML = Mustache.render(templates.Stream, { text: output, footer: templates.Footer });
      div.style.position = 'relative';
    },
    writeOutput: function(selector, content) {
      var div = selector.charAt(0) === '#' ? document.getElementById(selector.substring(1)) : document.getElementsByClassName(selector.substring(1));
      if (div instanceof HTMLCollection) {
        for (var i = 0; i < div.length; i++) {
          methods.renderStream(content, div[i]);
        }
      } else {
        methods.renderStream(content, div);
      }
    },
    renderIfReady: function(selector, header, activity) {
      if (header && activity) {
        methods.writeOutput(selector, header + activity);
      }
    }
  };

  obj.feed = function(options) {
    if (!options.username || !options.selector) {
      throw "You must specify the username and selector options for the activity stream.";
      return false;
    }

    var selector = options.selector,
        userUrl   = 'https://api.github.com/users/' + options.username,
        eventsUrl = userUrl + '/events',
        header,
        activity;

    if (!!options.repository){
      eventsUrl = 'https://api.github.com/repos/' + options.username + '/' + options.repository + '/events';
    }

    if (options.clientId && options.clientSecret) {
      var authString = '?client_id=' + options.clientId + '&client_secret=' + options.clientSecret;
      userUrl   += authString;
      eventsUrl += authString;
    }

    if (!!options.eventsUrl){
      eventsUrl = options.eventsUrl;
    }

    if (!!options.userUrl){
      userUrl = options.userUrl;
    }

    // Allow templates override
    if (typeof options.templates == 'object') {
      for (var template in templates) {
        if (typeof options.templates[template] == 'string') {
          templates[template] = options.templates[template];
        }
      }
    }

    methods.getOutputFromRequest(userUrl, function(error, output) {
      if (error) {
        header = Mustache.render(templates.UserNotFound, { username: options.username });
      } else {
        header = methods.getHeaderHTML(output)
      }
      methods.renderIfReady(selector, header, activity)
    });

    methods.getOutputFromRequest(eventsUrl, function(error, output) {
      if (error) {
        activity = Mustache.render(templates.EventsNotFound, { username: options.username });
      } else {
        var limit = options.limit != 'undefined' ? parseInt(options.limit, 10) : null;
        activity = methods.getActivityHTML(output, limit);
      }
      methods.renderIfReady(selector, header, activity);
    });
  };

  return obj;
}());

// Takes in milliseconds and converts it to a human readable time,
// such as 'about 3 hours ago' or '23 days ago'
function millisecondsToStr(milliseconds) {
  'use strict';

  function numberEnding(number) {
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

// Pluralizes a word, but only works when the word requires
// an 's' to be added for pluralization.
function pluralize(word, number) {
  // Yeah I know, this sucks.
  if (number !== 1) return word + 's';
  return word;
}

var templates = {
  Stream: '<div class="gha-feed">{{{text}}}<div class="gha-push-small"></div>{{{footer}}}</div>',
  Activity: '<div id="{{id}}" class="gha-activity">\
               <div class="gha-activity-icon"><span class="octicon octicon-{{icon}}"></span></div>\
               <div class="gha-message"><div class="gha-time">{{{timeString}}}</div>{{{userLink}}} {{{message}}}</div>\
               <div class="gha-clear"></div>\
             </div>',
  SingleLineActivity: '<div class="gha-activity gha-small">\
                         <div class="gha-activity-icon"><span class="octicon octicon-{{icon}}"></span></div>\
                         <div class="gha-message"><div class="gha-time">{{{timeString}}}</div>{{{userLink}}} {{{message}}}</div>\
                         <div class="gha-clear"></div>\
                       </div>',
  UserHeader: '<div class="gha-header">\
                 <div class="gha-github-icon"><span class="octicon octicon-mark-github"></span></div>\
                 <div class="gha-user-info{{withoutName}}">{{{userNameLink}}}<p>{{{userLink}}}</p></div>\
                 <div class="gha-gravatar">{{{gravatarLink}}}</div>\
               </div><div class="gha-push"></div>',
  Footer: '<div class="gha-footer">Public Activity <a href="https://github.com/caseyscarborough/github-activity" target="_blank">GitHub Activity Stream</a>',
  NoActivity: '<div class="gha-info">This user does not have any public activity yet.</div>',
  UserNotFound: '<div class="gha-info">User {{username}} wasn\'t found.</div>',
  EventsNotFound: '<div class="gha-info">Events for user {{username}} not found.</div>',
  CommitCommentEvent: 'commented on commit {{{commentLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>',
  CreateEvent: 'created {{payload.ref_type}} {{{branchLink}}}{{{repoLink}}}',
  DeleteEvent: 'deleted {{payload.ref_type}} {{payload.ref}} at {{{repoLink}}}',
  FollowEvent: 'started following {{{targetLink}}}',
  ForkEvent: 'forked {{{repoLink}}} to {{{forkLink}}}',
  GistEvent: '{{actionType}} {{{gistLink}}}',
  GollumEvent: '{{actionType}} the {{{repoLink}}} wiki<br>{{{userGravatar}}}<small>{{{message}}}</small>',
  IssueCommentEvent: 'commented on {{issueType}} {{{issueLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>',
  IssuesEvent: '{{payload.action}} issue {{{issueLink}}}<br>{{{userGravatar}}}<small>{{payload.issue.title}}</small>',
  MemberEvent: 'added {{{memberLink}}} to {{{repoLink}}}',
  PublicEvent: 'open sourced {{{repoLink}}}',
  PullRequestEvent: '{{payload.action}} pull request {{{pullRequestLink}}}<br>{{{userGravatar}}}<small>{{payload.pull_request.title}}</small>{{{mergeMessage}}}',
  PullRequestReviewCommentEvent: 'commented on pull request {{{pullRequestLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>',
  PushEvent: 'pushed to {{{branchLink}}}{{{repoLink}}}<br>\
                <ul class="gha-commits">{{#payload.commits}}<li><small>{{{committerGravatar}}} {{{shaLink}}} {{message}}</small></li>{{/payload.commits}}</ul>\
                <small class="gha-message-commits">{{{commitsMessage}}}</small>',
  ReleaseEvent: 'released {{{tagLink}}} at {{{repoLink}}}<br>{{{userGravatar}}}<small><span class="octicon octicon-cloud-download"></span>  {{{zipLink}}}</small>',
  WatchEvent: 'starred {{{repoLink}}}'
},

icons = {
  CommitCommentEvent: 'comment-discussion',
  CreateEvent_repository: 'repo-create',
  CreateEvent_tag: 'tag-add',
  CreateEvent_branch: 'git-branch-create',
  DeleteEvent: 'repo-delete',
  FollowEvent: 'person-follow',
  ForkEvent: 'repo-forked',
  GistEvent: 'gist',
  GollumEvent: 'repo',
  IssuesEvent: 'issue-opened',
  IssueCommentEvent: 'comment-discussion',
  MemberEvent: 'person',
  PublicEvent: 'globe',
  PullRequestEvent: 'git-pull-request',
  PullRequestReviewCommentEvent: 'comment-discussion',
  PushEvent: 'git-commit',
  ReleaseEvent: 'tag-add',
  WatchEvent: 'star'
},

singleLineActivities = [ 'CreateEvent', 'DeleteEvent', 'FollowEvent', 'ForkEvent', 'GistEvent', 'MemberEvent', 'WatchEvent' ];

/** MD5 methods written by Joseph Myers. http://www.myersdaily.org/joseph/javascript/md5-text.html */
function md5cycle(x, k) {
  var a = x[0], b = x[1], c = x[2], d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17,  606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12,  1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7,  1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7,  1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22,  1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14,  643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9,  38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5,  568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20,  1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14,  1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16,  1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11,  1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4,  681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23,  76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16,  530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10,  1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6,  1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6,  1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21,  1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15,  718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
  /*
  * Was previously txt = '' but when 'use strict' was applied this would result in the following error
  * Uncaught ReferenceError: txt is not defined
  */
  var txt = '';
  var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
  for (i=64; i<=s.length; i+=64) {
    md5cycle(state, md5blk(s.substring(i-64, i)));
  }
  s = s.substring(i-64);
  var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  for (i=0; i<s.length; i++)
  tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
  tail[i>>2] |= 0x80 << ((i%4) << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i=0; i<16; i++) tail[i] = 0;
  }
  tail[14] = n*8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
* unless we pretend that we can redefine the MD-5
* algorithm for multi-byte characters (perhaps
* by adding every four 16-bit characters and
* shortening the sum to 32 bits). Otherwise
* I suggest performing MD-5 as if every character
* was two bytes--e.g., 0040 0025 = @%--but then
* how will an ordinary MD-5 sum be matched?
* There is no way to standardize text to something
* like UTF-8 before transformation; speed cost is
* utterly prohibitive. The JavaScript standard
* itself needs to look at this: it should start
* providing access to strings as preformed UTF-8
* 8-bit unsigned value arrays.
*/
function md5blk(s) { /* I figured global was faster.   */
  var md5blks = [], i; /* Andy King said do it this way. */
  for (i=0; i<64; i+=4) {
    md5blks[i>>2] = s.charCodeAt(i)
    + (s.charCodeAt(i+1) << 8)
    + (s.charCodeAt(i+2) << 16)
    + (s.charCodeAt(i+3) << 24);
  }
  return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
  var s='', j=0;
  for(; j<4; j++)
  s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
  + hex_chr[(n >> (j * 8)) & 0x0F];
  return s;
}

function hex(x) {
  for (var i=0; i<x.length; i++)
  x[i] = rhex(x[i]);
  return x.join('');
}

function md5(s) {
  return hex(md51(s));
}

function add32(a, b) {
  return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  function add32(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
}
