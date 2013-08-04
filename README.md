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

## Contributing to the Application

If you'd like to contribute to the application or run a local copy, clone the repository, run bundle install, and fire up the rails server.

```bash
$ git clone https://github.com/caseyscarborough/github-activity.git
$ cd github-activity
$ bundle install
$ rails s
```

## To Do

### More event types!

The application is currently missing the follwoing [event types](http://developer.github.com/v3/activity/events/types/):
* [DownloadEvent](http://developer.github.com/v3/activity/events/types/#downloadevent)
* [ForkApplyEvent](http://developer.github.com/v3/activity/events/types/#forkapplyevent)
* [TeamAddEvent](http://developer.github.com/v3/activity/events/types/#teamaddevent)


## Fork and Enjoy

Please feel free to contribute to the application by following the steps below:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
