/**
 * Github activity feed.
 *
 * Graeme Sutherland, July 2012.
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
            pushed to <a href="<%= repository.url %>"> \
                <%= repository.name %></a> on \
                    <% print(repository.pushed_at.substring(0, 10)); %>. \
            <ul><% _.each(payload.shas, function(sha) { %> \
                <li><%= sha[0].substring(0,6) %> \
                <%= sha[2] %>.<% }); %></ul>\
            </li>';
                

    /**
     * Fill in activity into selector from public events for username,
     * with optional template selector tmpl_selector.
     */
    self.show_activity = function (username, selector, tmpl_selector) {
        var 
            url = 'https://github.com/' + username + '.json?callback=?',
            template = $(tmpl_selector).html() || default_template,
            compiled = _.template(template);
        
        $.getJSON(url, {}, function (data) {
            $.each(data, function(index, commit) {
                $(selector).append(compiled(commit));
            });
        });
    };

    return self;

}(jQuery, _));
