# GitHub Activity Stream Widget

This repository is an embeddable widget that displays a user's public activity on GitHub. It displays a user's username, name, photo, and a specified number of recent activity updates.

To see a demo of the widget, click [here](http://caseyscarborough.github.com/github-activity/?username=caseyscarborough&limit=30).

To see how it will look for another account, you can update the URL string with your username (or someone else's).

Here is a sample screenshot of the widget:

<p align="center">
  <img src="https://caseyscarborough.github.com/github-activity/img/screenshot.png" title="GitHub Activity Stream for @matz" />
</p>

## Embedding the Widget

To embed the built in widget on your site to show your GitHub activity stream, add the following HTML into your webpage, filling in your username and limit where necessary.

The **username** parameter is required to use the widget, but the **limit** parameter is not. If not specified, it will default to the latest 30 activity updates.

**With Specific Limit**
```html
<iframe src="http://caseyscarborough.github.com/github-activity/?username=USERNAME&limit=LIMIT"
  allowtransparency="true" frameborder="0" width="100%" height="400px" />
```

**Without Specific Limit**
```html
<iframe src="http://caseyscarborough.github.com/github-activity/?username=USERNAME"
  allowtransparency="true" frameborder="0" width="100%" height="400px" />
```

Also be sure to change the values for the width and height if you need to.


## To Do

* Add support for more event types.

## Contributors

* [Casey Scarborough](https://github.com/caseyscarborough)
* [Graeme Sutherland](https://github.com/grasuth)
* [Brett Bohnenkamper](https://github.com/KittyKatt)

Click [here](https://github.com/caseyscarborough/github-activity/commits/master) to view the full list of commits and contributions.

The following libraries are used in the project.

* [jQuery](http://jquery.com/)
* [underscore.js](http://underscorejs.org/)
* [timeago.js](http://timeago.yarp.com/)
* [spin.js](http://fgnass.github.io/spin.js/)
* [FontAwesome](http://fontawesome.io)

## Fork and Enjoy

Please feel free to contribute to the application by following the steps below:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
