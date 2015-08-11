export const MS_IN_MINUTES = 60 * 1000;

/**
 * format date times for the urls for cals
 * @param  {Date} date   the Date object to be formatted
 * @return {String}      formatted date time
 * @example:
 *     var date = new Date();
 *     var formattedString = formatTime(date);
 *     formattedString === '20150528T072000Z'
 */
export const formatTime = (date) => {
  return date.toISOString().replace(/-|:|\.\d+/g, '');
};


 /**
 * calculate an end time for the events 
 * @param  {Object} event a calendar event
 * @return {String}       formatted date time
 */
export const calculateEndTime = ({end, start, duration=0}) => {
  return end ?
    formatTime(end) :
    formatTime(new Date(start.getTime() + (duration * MS_IN_MINUTES)));
};

/**
 * Given one calendar event, will create am EVENT string ready
 * to be mashed with a full .ics download string. Helpfull when adding
 * multiple events to one .ics file
 * @param  {Object} event calendar event object
 * @return {String}       one EVENT string produced to be combined with
 *                            header and footer string text so for .ics download
 */
export const createIcsStringFromEvent = (event) => {
  const startTime = formatTime(event.start);
  const endTime = calculateEndTime(event);
  const href = `BEGIN:VEVENT\nURL:${document.URL}\nDTSTART:${startTime || ''}\nDTEND:${endTime || ''}\nSUMMARY:${event.title || ''}\nDESCRIPTION:${event.description || ''}\nLOCATION:${event.address || ''}\nEND:VEVENT`;
  return href;
};


/**
 * creates a full .ics download url given an array of calender events
 * @param  {Array|Object} events array of or single calender object
 * @return {String}        full data: url for downloading .ics file
 */
export const makeIcs = (events) => {
  if (!Array.isArray(events)) {
      events = [events];
  }

  const dataRef = 'data:text/calendar;charset=utf8,';
  let href = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0'
  ];

  const builtHref = events.reduce((_href, event) => {
      _href.push(createIcsStringFromEvent(event));
      return _href;
  }, href);

  builtHref.push('END:VCALENDAR');

  return encodeURI(dataRef + builtHref.join('\n'));;
};