# GitHub Activity Stream Widget

This repository is an small Rails app that creates an embeddable widget to display a user's public activity on GitHub. It displays a user's username, name, photo, and a specified number of recent activity updates. This small application was previously a single-page written completely in Javascript, but was converted for better performance.

To see a demo of the widget, click [here](http://ghactivity.com/caseyscarborough).

To see how it will look for another account, you can update the URL string with your username (or someone else's).

Here is a sample screenshot of the widget:

<p align="center"><img src="https://caseyscarborough.github.com/github-activity/img/screenshot.png" title="GitHub Activity Stream for @matz" /></p>

## Embedding the Widget

To embed the built in widget on your site to show your GitHub activity stream, add the following HTML into your webpage, filling in your username and limit where necessary.

The **username** parameter is required to use the widget, but the **limit** parameter is not. If not specified, it will default to the latest 30 activity updates.

**With Specific Limit**
```html
<iframe src="http://ghactivity.com/username/limit"
  allowtransparency="true" frameborder="0" width="100%" height="400px"></iframe>
```

**Without Specific Limit**
```html
<iframe src="http://ghactivity.com/username"
  allowtransparency="true" frameborder="0" width="100%" height="400px"></iframe>
```

Also be sure to change the values for the width and height if you need to.

### Error When Using SSL

If you receive an untrusted error when using the widget on a site with an SSL certificate, you can remedy this by downloading the
[most recent version](https://raw.github.com/caseyscarborough/github-activity/gh-pages/index.html) of the index.html file used for the
widget and hosting a copy on your site in a folder named `github-activity`. You can then access it using an `iframe` in the same way as above:

```html
<iframe src="https://example.com/github-activity/?username=USERNAME"
  allowtransparency="true" frameborder="0" width="100%" height="400px"></iframe>
```

## To Do
* More event types!

## Fork and Enjoy

Please feel free to contribute to the application by following the steps below:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
