# GitHub Activity Stream Plugin

This repository is a JavaScript module to read and render a user's public GitHub activity
as HTML. 

This Javascript reads the public activity returned by 
`http://github.com/username.json` as jsonp and renders it either to a
default or given html template.

It also includes a widget for you to embed on your site. To see a demo of the widget, click
[here](http://blog.caseyscarborough.com/activity/).

## Widget Usage

If you'd just like to use the built in widget on your site to show your GitHub activity stream, embed the following HTML
into your webpage, filling in your username and limit where necessary:

```html
<iframe src="http://caseyscarborough.github.com/github-activity/?username=USERNAME&limit=20"
  allowtransparency="true" frameborder="0" width="100%" height="400px"></iframe>
```

Also be sure to change the values for the width and height if you need to. This will render the widget
into your page.

## Using the github-activity.js Library

If you'd like to customize the output of the activity stream, or to contribute, you'll
want to use the following steps.

### Dependencies

The following are dependencies for the project, but are included using cdnjs.

* jQuery
* underscore.js
* timeago.js

### Setting up the page

Define a container for results to be put in:

```html
<div id="github-activity">
</div>
```

Include underscore.js, timeago.js, jQuery and github_activity.js:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js"></script>
<script src="github_activity.js"></script>
```

### Calling the show_activity method

Call `GitHubActivity.show_activity(username, selector, limit);` to render activity.
You can do this one of two ways. The first is explicitly passing in the username and limit.

```html
<script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        GithubActivity.show_activity('username', '#github-activity', 'limit');
    });
</script>
```

The second way is by passing them in through the URL string like using a request to your page like:
`http://example.com/github-activity/?username=USERNAME&limit=LIMIT`.

```html
<script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        // Get the parameters from the URL string
        username = getURLParameter('username');
        limit = getURLParameter('limit');

        GithubActivity.show_activity(username, '#github-activity', limit);
    });
</script>
```

### Specifying a template (optional)

Optionally, you can provide your own template html like this:

```javascript
GithubActivity.show_activity('username', '#github-activity', 'limit', '#my-template');
```

Where `'#my-template'` is a selector for your provided template.  Look
at the output of https://github.com/your_username.json to get an idea of the fields you can use in the template.

The standard template uses the following format:

```erb
<div class="activity">
  
  <div class="gravatar">
    <a href="https://github.com/<%= actor %>">
      <img src="http://gravatar.com/avatar/<%= actor_attributes.gravatar_id %>" />
    </a>
  </div>
  
  <div class="information">
    <a href="https://github.com/<%= actor %>"><%= actor %></a>
    
    <% if (type == "PushEvent") { %>
      pushed to <a href="<%= repository.url %>"><%= repository.name %></a>.<br />
      <% _.each(payload.shas, function(sha) { %><br />
        <small><a href="<%= url %>"><%= sha[0].substring(0, 6) %></a></small> 
        <small><%= sha[2] %></small></li><% }); %>
    
    <% } else if (type == "CreateEvent") { %> 
      created branch <a href="<%= repository.url %>/tree/<%= payload.ref %>"> 
      <%= payload.ref %></a> at <a href="<%= repository.url %>"><%= repository.name %></a>. 
    <% } %><br /><br />
    
    <span class="muted"><small><% print($.timeago(created_at)); %></span></small><br />
  </div>

  <div class="clear"></div>
</div>
```

## To Do


## Fork and Enjoy

Please feel free to contribute to the application by following the steps below:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
