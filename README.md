# ngCalendar

> add to calendar factory useful for adding events to popular calendars
> like iCal, google calendar, outlook, and Yahoo

## Getting Started

`ngCalendar` was developed with ES2015 and an `UMD` approach, so it will work in any environment, browser, node, AMD, commonjs, ES2015 modules. To install you can use `npm` or bower.

* `npm i -S udacity/ngCalendar`
* `bower i --save https://github.com/udacity/ngCalendar.git#0.0.1`

Once installed, you have to make sure you have angular loaded first then add the `ngCalendar` module:
``` javascript
angular.module('app', ['ngCalendar']);
```

## Usage
ngCalendar comes packed with the ability to generate links to either download `.ics` files or embed calendar events into web claendars. First you need to create a calendar event.

* `event.start <Date>`: when the event starts. `REQUIRED`
* `event.end <Date>`: when the event ends. `OPTIONAL`
* `event.title <String>`: the title of the event. `REQUIRED`
* `event.description <String>`: the description of the event. `OPTIONAL`
* `event.address <String>`: the location of the event. `OPTIONAL`
* `event.duration <Number>:` the duration of the event in minutes. `OPTIONAL`

``` javascript
var calEvent = {
    start: new Date(),
    end: new Date(),
    duration: 0,
    addresss: '',
    title: 'This is an event',
    description: 'this is s a demo event'
};
```
Now that you have an event, you can create a link to embed or download using the helper methods on the `Calendar` service.

``` javascript
angular.module('app', ['ngCalendar'])
    .controller('Main', function(Calendar){
    });
```
* `Calendar.google(<Object:cal event>)`
    *   takes a calendar event and returns a `url` that when opened will route to google calendar with a new calendar event filled out with the given details.

* `Calendar.yahoo(<Object:cal event>)`
    * takes a calendar event and returns a `url` that when opened will route to yahoo calendar with a new calendar event filled out with the given details.

* `Calendar.ical(<Array:cal events>|<Object:cal event>)`
    * takes a single or an array of calendar events and returns a `data uri` then when opened will download an `.ics` file ready for import with `iCal`. 

* `Calendar.outlook(<Array:cal events>|<Object:cal event>)`
    * takes a single or an array of calendar events and returns a `data uri` then when opened will download an `.ics` file ready for import with `Outlook`. 


## Contributing
make sure you have the latest version on `node`.
* `fork & clone`
* `npm i`

all source code lives in the `src` directory. Gulp is used together with webpack to build and bundle the source code.
* `Gulp`
    * default task: will bundle and watch the files for rebundling
* `Gulp bundle`
    *   will bundle the source code with `UMD` features
* `Gulp minify`
    *   will bundle and create a minified file with `UMD` features
* `Gulp watch`
    *   will watch the src files and rebundle on save

Make your changes and submit a PR when you are done.

To test, run `karma start`. There is a `demo` directory where you can visually test the code with a small angular app.
