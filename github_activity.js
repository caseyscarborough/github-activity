/**
 * Github activity feed.
 *
 * Graeme Sutherland, July 2012.
 *
 * Modified by Brett Bohnenkamper, July 2013
 *
 * Uses .json activity from github to show public commits.
 * Requires jQuery and underscore.js
 *
 */

var GithubActivity = (function($, _) {

    var 
        self = {},
        gh = 'http://github.com/',
         default_template = '<li> \
            <a href="https://github.com/<%= actor %>"><%= actor %></a> \
            <% if (type == "PushEvent") { %> \
            pushed to <a href="<%= repository.url %>"> \
                <%= repository.name %></a> on \
                    <% print(repository.pushed_at.substring(0, 10)); %>. \
            <ul><% _.each(payload.shas, function(sha) { %> \
                <li><%= sha[0].substring(0,6) %> \
                <%= sha[2] %>.<% }); %></ul>\
            <% } else if (type == "GistEvent") { %> \
            <%= payload.action %>d gist: <a href="<%= payload.url %>">\
            <%= payload.desc %></a>.\
            <% } %>\
            </li>';               

    /**
     * Fill in activity into selector from public events for username,
     * with optional template selector tmpl_selector.
     */
    self.show_activity = function (username, selector, items, tmpl_selector) {
        var 
            url = 'https://github.com/' + username + '.json?callback=?',
            template = $(tmpl_selector).html() || default_template,
	    limit = items || '5',
            compiled = _.template(template);
	    limit++;
        
        $.getJSON(url, {}, function (data) {
            $.each(data.slice(0, limit), function(index, commit) {
                $(selector).append(compiled(commit));
            });
        });
    };

    return self;

}(jQuery, _));
