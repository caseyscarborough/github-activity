// This function gets the value of a parameter from the URL string.
// For example, on the URL http://example.com/?username=testuser, the
// function would return 'testuser'.
function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
  );
}

// These functions are used for calculating MD5 hashes.
// http://www.myersdaily.org/joseph/javascript/md5-text.html
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
  txt = '';
  var n = s.length,
  state = [1732584193, -271733879, -1732584194, 271733878], i;
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

function rhex(n) {
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

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

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


// END MD5 FUNCTIONS

// This function returns the Gravatar for a particular users email
function gravatarByEmail(email, cssClass) {
  return gravatarById(md5(email), cssClass);
}

function gravatarById(hash, cssClass) {
  return '<img src="http://gravatar.com/avatar/' + hash + '?s=200" class="' + cssClass + '" />';
}

// This function returns the correct icon for a specific type of GitHub activity
function iconFor(type) {
  if (type === "PushEvent") {
    return "icon-upload";
  } else if (type === "CommentEvent" || type === "PullRequestReviewCommentEvent" || type === "IssueCommentEvent") {
    return "icon-comments";
  } else if (type === "ForkEvent") {
    return "icon-code-fork";
  } else if (type === "CreateEvent" || type === "MemberEvent"){
    return "icon-plus";
  } else if (type === "DeleteEvent") {
    return "icon-ban-circle";
  } else if (type === "WatchEvent") {
    return "icon-star";
  } else if (type === "FollowEvent") {
    return "icon-male";
  } else if (type === "GistEvent") {
    return "icon-code";
  } else if (type === "PullRequestEvent") {
    return "icon-download";
  } else if (type === "GollumEvent") {
    return "icon-info";
  } else {
    return "icon-github-alt";
  }
}

/**
 * Github Activity Feed
 * 
 * Originated by Graeme Sutherland, July 2012.
 * Modified by Brett Bohnenkamper, July 2013.
 * Modified by Casey Scarborough, July 2013.
 *
 * Uses .json activity from github to show public commits.
 * Requires jQuery and underscore.js
 */
var GithubActivity = (function($, _) {
  var
    self = {},
    gh = 'http://github.com/',
    header = '\
    <div class="header">\
      <a href="h<%= gravatarFor(actor<br />\
    </div>\
    ';
    default_template = '\
    <div class="activity">\
      <div class="activity-icon">\
        <i class="<%= iconFor(type) %> icon-large"></i>\
      </div>\
      <div class="information">\
        <span class="muted"><small><% print($.timeago(created_at)); %></span></small><br />\
        <a href="https://github.com/<%= actor %>"><%= actor %></a>\
        <% if (type == "PushEvent") { %>\
          pushed to <a href="<%= repository.url %>/tree/<%= payload.ref.substr(11) %>"><%= payload.ref.substr(11) %></a> \
          at <a href="<%= repository.url %>"><%= repository.name %></a>.<br />\
          <ul>\
          <% _.each(payload.shas, function(sha) { %>\
            <li><%= gravatarByEmail(sha[1], "gravatar-small") %> \
            <small class="sha"><a href="https://github.com/<%= actor %>/<%= repository.name %>/commit/<%= sha[0] %>"><%= sha[0].substring(0, 6) %></a></small> \
            <small><%= sha[2] %></small></li><% }); %>\
          </ul>\
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
            <%= payload.pull_request.base.repo.full_name %>#<%= payload.pull_request.number %></a>.<br />\
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
        <% } else { %>\
          interacted with  <a href="<%= repository.url %>"><%= repository.owner %>/<%= repository.name %></a>.\
        <% } %>\
      </div><div class="clear"></div>\
    </div>';

  self.show_activity = function(username, selector, items, tmpl_selector) {
    var 
      url = 'https://github.com/' + username + '.json?callback=?',
      template = $(tmpl_selector).html() || default_template,
      header = 
      limit = items || '5',
      compiled = _.template(template);

    $.getJSON(url, {}, function(data) {
      $(selector).append('\
        <div class="header">\
          <div class="gravatar">\
            <a href="https://github.com/' + data[0]["actor"] + '">' + gravatarById(data[0]["actor_attributes"]["gravatar_id"], "gravatar-large") + '</a>\
          </div>\
          <div class="github-icon"><i class="icon-github icon-large"></i></div>\
          <div class="user-info">\
            <a href="https://github.com/' + data[0]["actor"] + '">' + data[0]["actor_attributes"]["name"] + '</a>\
            <p>' + data[0]["actor"] + '</p>\
          </div><div class="clear"></div>\
        </div><div class="push"></div>\
      ');
      $.each(data.slice(0, limit), function(index, commit) {
        $(selector).append(compiled(commit));
      });
    });
  };
  return self;
}(jQuery, _));

/* spin.min.js */
(function(t,e){if(typeof exports=="object")module.exports=e();else if(typeof define=="function"&&define.amd)define(e);else t.Spinner=e()})(this,function(){"use strict";var t=["webkit","Moz","ms","O"],e={},i;function o(t,e){var i=document.createElement(t||"div"),o;for(o in e)i[o]=e[o];return i}function n(t){for(var e=1,i=arguments.length;e<i;e++)t.appendChild(arguments[e]);return t}var r=function(){var t=o("style",{type:"text/css"});n(document.getElementsByTagName("head")[0],t);return t.sheet||t.styleSheet}();function s(t,o,n,s){var a=["opacity",o,~~(t*100),n,s].join("-"),f=.01+n/s*100,l=Math.max(1-(1-t)/o*(100-f),t),d=i.substring(0,i.indexOf("Animation")).toLowerCase(),u=d&&"-"+d+"-"||"";if(!e[a]){r.insertRule("@"+u+"keyframes "+a+"{"+"0%{opacity:"+l+"}"+f+"%{opacity:"+t+"}"+(f+.01)+"%{opacity:1}"+(f+o)%100+"%{opacity:"+t+"}"+"100%{opacity:"+l+"}"+"}",r.cssRules.length);e[a]=1}return a}function a(e,i){var o=e.style,n,r;if(o[i]!==undefined)return i;i=i.charAt(0).toUpperCase()+i.slice(1);for(r=0;r<t.length;r++){n=t[r]+i;if(o[n]!==undefined)return n}}function f(t,e){for(var i in e)t.style[a(t,i)||i]=e[i];return t}function l(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)if(t[o]===undefined)t[o]=i[o]}return t}function d(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}var u={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function p(t){if(typeof this=="undefined")return new p(t);this.opts=l(t||{},p.defaults,u)}p.defaults={};l(p.prototype,{spin:function(t){this.stop();var e=this,n=e.opts,r=e.el=f(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),s=n.radius+n.length+n.width,a,l;if(t){t.insertBefore(r,t.firstChild||null);l=d(t);a=d(r);f(r,{left:(n.left=="auto"?l.x-a.x+(t.offsetWidth>>1):parseInt(n.left,10)+s)+"px",top:(n.top=="auto"?l.y-a.y+(t.offsetHeight>>1):parseInt(n.top,10)+s)+"px"})}r.setAttribute("role","progressbar");e.lines(r,e.opts);if(!i){var u=0,p=(n.lines-1)*(1-n.direction)/2,c,h=n.fps,m=h/n.speed,y=(1-n.opacity)/(m*n.trail/100),g=m/n.lines;(function v(){u++;for(var t=0;t<n.lines;t++){c=Math.max(1-(u+(n.lines-t)*g)%m*y,n.opacity);e.opacity(r,t*n.direction+p,c,n)}e.timeout=e.el&&setTimeout(v,~~(1e3/h))})()}return e},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=undefined}return this},lines:function(t,e){var r=0,a=(e.lines-1)*(1-e.direction)/2,l;function d(t,i){return f(o(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:t,boxShadow:i,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*r+e.rotate)+"deg) translate("+e.radius+"px"+",0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(;r<e.lines;r++){l=f(o(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:i&&s(e.opacity,e.trail,a+r*e.direction,e.lines)+" "+1/e.speed+"s linear infinite"});if(e.shadow)n(l,f(d("#000","0 0 4px "+"#000"),{top:2+"px"}));n(t,n(l,d(e.color,"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,i){if(e<t.childNodes.length)t.childNodes[e].style.opacity=i}});function c(){function t(t,e){return o("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}r.addRule(".spin-vml","behavior:url(#default#VML)");p.prototype.lines=function(e,i){var o=i.length+i.width,r=2*o;function s(){return f(t("group",{coordsize:r+" "+r,coordorigin:-o+" "+-o}),{width:r,height:r})}var a=-(i.width+i.length)*2+"px",l=f(s(),{position:"absolute",top:a,left:a}),d;function u(e,r,a){n(l,n(f(s(),{rotation:360/i.lines*e+"deg",left:~~r}),n(f(t("roundrect",{arcsize:i.corners}),{width:o,height:i.width,left:i.radius,top:-i.width>>1,filter:a}),t("fill",{color:i.color,opacity:i.opacity}),t("stroke",{opacity:0}))))}if(i.shadow)for(d=1;d<=i.lines;d++)u(d,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(d=1;d<=i.lines;d++)u(d);return n(e,l)};p.prototype.opacity=function(t,e,i,o){var n=t.firstChild;o=o.shadow&&o.lines||0;if(n&&e+o<n.childNodes.length){n=n.childNodes[e+o];n=n&&n.firstChild;n=n&&n.firstChild;if(n)n.opacity=i}}}var h=f(o("group"),{behavior:"url(#default#VML)"});if(!a(h,"transform")&&h.adj)c();else i=a(h,"animation");return p});