# GitHub Activity Stream Widget

This repository is an small Rails app that creates an embeddable widget to display a user's public activity on GitHub. It displays a user's username, name, photo, and a specified number of recent activity updates. This small application was previously written in Javascript, but was converted to Rails for performance and expandability.

To see a demo of the widget, click [here](http://ghactivity.com/caseyscarborough).

To see how it will look for another account, you can update the URL string with your username (or someone else's).

Here is a sample screenshot of the widget:

<p align="center"><img src="https://raw.github.com/caseyscarborough/github-activity/master/app/assets/images/screenshot.png" title="GitHub Activity Stream for @matz" /></p>

## Embedding the Widget

To embed the built in widget on your site to show your GitHub activity stream, add the following HTML into your webpage, filling in your username and limit where necessary.

The **username** parameter is required to use the widget, but the **limit** parameter is not. If the **limit** is not specified, it will default to the latest 30 activity events.

**With Specific Limit**

```html
<iframe src="http://ghactivity.com/username/limit" frameborder="0" width="100%" height="400px"></iframe>
```

**Without Specific Limit**

```html
<iframe src="http://ghactivity.com/username" frameborder="0" width="100%" height="400px"></iframe>
```

Also be sure to change the values for the width and height if you need to.

## Contributing to the Application

If you'd like to contribute to the application or run a local copy, clone the repository, and run bundle install.

```bash
$ git clone https://github.com/caseyscarborough/github-activity.git
$ cd github-activity
$ bundle install
```

Afterwards, rename the example application.yml file to application.yml and fill in the values in the file where necessary. Then fire up the rails server.

```bash
$ mv config/application.example.yml config/application.yml
$ rails s
```

Note: You don't need a GitHub client_id and client_secret to run the application, you will just be [rate limited](http://developer.github.com/v3/#rate-limiting) to 60 requests per hour.

## To Do

### More event types!

The application is currently missing the following [event types](http://developer.github.com/v3/activity/events/types/):
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
