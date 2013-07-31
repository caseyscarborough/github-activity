# GitHub Activity Stream Widget

This repository is a JavaScript module that reads and renders a user's public GitHub activity as embeddable HTML. It includes the `github-activity.js` library, as well as an example usage page, `index.html`.

To see a demo of the widget, click [here](http://blog.caseyscarborough.com/activity/).

To see how it will look for your account, or a particular user, click
[here](http://caseyscarborough.github.com/github-activity/?username=caseyscarborough&limit=25)
and update the username parameter in the URL string with your username.

## Embedding the Widget

If you'd just like to use the built in widget on your site to show your GitHub activity stream, embed the following HTML into your webpage, filling in your username and limit where necessary:

```html
<iframe src="http://caseyscarborough.github.com/github-activity/?username=USERNAME&limit=LIMIT"
  allowtransparency="true" frameborder="0" width="100%" height="400px" />
```

Also be sure to change the values for the width and height if you need to. This will render the widget into your page.

## Using the github-activity.js Library

If you'd like to customize the output of the activity stream, or to contribute, you'll
want to use the following steps.

### Dependencies

The libraries are used in the project.

* [jQuery](http://jquery.com/)
* [underscore.js](http://underscorejs.org/)
* [timeago.js](http://timeago.yarp.com/)
* [spin.js](http://fgnass.github.io/spin.js/)
* [FontAwesome](http://fontawesome.io)

### Setting Up the Page

Add includes and the github-activity.js library in the head of your page:

```html
<head>
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" />
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js"></script>
  <script src="github-activity.js"></script>
</head>
```

Define a container for results to be put into:

```html
<div id="github-activity">
</div>
```

### Calling the show_activity Method

Call `GithubActivity.show_activity(username, selector, limit);` to render activity.
You can do this one of two ways. The first is explicitly passing in the username and limit.

```html
<script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        GithubActivity.show_activity('username', '#github-activity', 'limit');
    });
</script>
```

The second way, which is used by the widget, is by passing them in through the URL string using a request to your page like:
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

## To Do

* Add support for more event types.

## Contributors

* [Casey Scarborough](https://github.com/caseyscarborough)
* [Graeme Sutherland](https://github.com/grasuth)
* [Brett Bohnenkamper](https://github.com/KittyKatt)

Click [here](https://github.com/caseyscarborough/github-activity/commits/master) to view the full list of commits and contributions.

## Fork and Enjoy

Please feel free to contribute to the application by following the steps below:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
