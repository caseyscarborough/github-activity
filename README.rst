github-activity
===============

A JavaScript module to read and render a user's public github activity
as HTML.  

This javascript reads the public activity returned by 
``http://github.com/username.json`` as jsonp and renders it either to a
default or given html template.

Dependencies
------------
* JQuery
* underscore.js

How to use
----------

1. Define a container for results to be put in::

    <ul id="#github-activity">
    </ul>

2. Include underscore, jQuery and github_activity.js::

    <script src="/static/js/jquery.min.js"></script>
    <script src="/static/js/underscore-min.js"></script>
    <script src="/static/js/github_activity.js"></script>

3. Call ``GitHubActivity.show_activity(username, selector, limit);`` to render
   activity::

    <script type="text/javascript" charset="utf-8">
        $(document).ready(function() {
            GithubActivity.show_activity('your_userid', '#github-activity', 'itemslimit');
        });
    </script>

4. Optionally, you can provide your own template html like this::

        GithubActivity.show_activity('your_userid', 
                                        '#github-activity',
					'limit',
                                        '#my-template');

Where ``'#my-template'`` is a selector for your provided template.  Look
at the output of::

https://github.com/your_username.json

to get an idea of the fields you can use in the template.

The standard template is like this::

    <script type="text/template" id="#my-template">
        <li>
          <a href="https://github.com/<%= actor %>"><%= actor %></a>
          <% if (type == "PushEvent") { %> 
                pushed to 
                <a href="<%= repository.url %>"><%= repository.name %></a> on 
                <% print(repository.pushed_at.substring(0, 10)); %>.
                <ul>
                  <% _.each(payload.shas, function(sha) { %>
                        <li>
                          <%= sha[0].substring(0,6) %>
                          <%= sha[2] %>.
                        </li>
                  <% }); %>
                </ul>
                <% } else if (type == "GistEvent") { %> 
                     <%= payload.action %>d gist: <a href="<%= payload.url %>">\
                     <%= payload.desc %></a>.\
                <% } %>\
        </li>
    </script>

Event type is used to select the text displayed, and there is currently
support for PushEvents and GistEvents. Extras can be added to the template
 as needed.

To Do Next
----------

There should be a way to limit the length of displayed results as an option.

Fork and Enjoy
--------------

Feel free to fork and modify as you will or raise issues for changes.


