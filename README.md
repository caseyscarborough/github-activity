# GitHub Activity Stream Widget

This is a small Javascript plugin that creates a stream of your recent GitHub activity. It displays the user's name, username, photo, and a list of each individual activity type. Click [here](https://caseyscarborough.github.io/github-activity) for a demo.

A sample image of the activity stream is shown below:

![](https://raw.githubusercontent.com/caseyscarborough/github-activity/gh-pages/images/matz.png)

### Dependencies

The two dependencies for the plugin are [jQuery](http://jquery.com/) and the [Mustache](https://github.com/janl/mustache.js/) templating library. You can include these along with the scripts for the plugin in the head of your page with the following HTML:

```html
<link rel="stylesheet" src="github-activity.min.css">

<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.2/mustache.min.js"></script>
<script type="text/javascript" src="github-activity.min.js"></script>
```

## Usage

To use the library, begin by creating a new div with an id in the body of your page:

```html
<div id="feed"></div>
```

Then call the feed method on it in your `$(document).ready()`:

```html
<script type="text/javascript">
$(function() {
  GitHubActivity.feed({ username: "your-username", selector: "#feed" });
});
</script>
```

## Credits

* [MD5 Methods](http://www.myersdaily.org/joseph/javascript/md5-text.html)

## Fork and Enjoy

Please feel free to contribute to the application by following the steps below:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
