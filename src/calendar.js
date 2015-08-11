import {formatTime, calculateEndTime, makeIcs, MS_IN_MINUTES} from './util';

export const calendar = () => {
   /**
   * GCal is a webclient, so we can open a new cal by issuing a
   * GET request with a formatted URL. This function builds that URL using
   * a calendar event object that just has metadata about what the calendar should
   * set as far as start time, duration, title, etc.
   * @param  {Object} event the calendar event
   * @return {String}       the fully formatted and encoded URL ready for GET request
   */
  const makeGoogleCalendarUrl = (event) => {
    const startTime = formatTime(event.start);
    const endTime = calculateEndTime(event);

    const href = encodeURI(
      `https://www.google.com/calendar/render?action=TEMPLATE&text=${event.title || ''}&dates=${startTime || ''}/${endTime || ''}&details=${event.description || ''}&location=${event.address || ''}&sprop=&sprop=name:`
    );

    return href;
  };

  /**
   * Yahoo is a webclient, so we can open a new cal but issuing a
   * GET request with a formatted URL. This function builds that URL using
   * a calender event object.
   * @param  {Object} event calendar event object
   * @return {String}       the fully formatted and encoded URL ready for GET request
   */
  const makeYahooCalendarUrl = (event) => {
    const eventDuration = event.end ?
        ((event.end.getTime() - event.start.getTime())/ MS_IN_MINUTES) :
        event.duration;

    const yahooHourDuration = eventDuration < 600 ?
        '0' + Math.floor((eventDuration / 60)) :
        Math.floor((eventDuration / 60)) + '';

    const yahooMinuteDuration = eventDuration % 60 < 10 ?
        '0' + eventDuration % 60 :
        eventDuration % 60 + '';

    const yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

    const st = formatTime(
        new Date(event.start - (event.start.getTimezoneOffset() *
        MS_IN_MINUTES))) || '';

    const href = encodeURI(
      `http://calendar.yahoo.com/?v=60&view=d&type=20&title=${event.title || ''}&st=${st}&dur=${yahooEventDuration || ''}&desc=${event.description || ''}&in_loc=${event.address || ''}`
    );

    return href;
  };

  /**
   * create .ics file for mac calendar
   * @param  {[type]} events [description]
   * @return {[type]}        [description]
   */
  const ical = (events) => {
    return makeIcs(events);
  };

  /**
   * create .ics file for outlook calendar
   * @param  {[type]} events [description]
   * @return {[type]}        [description]
   */
  const outlook = (events) => {
    return makeIcs(events);
  };

  // Alias for views
  const google = (event) => {
    return makeGoogleCalendarUrl.call(this, event);
  };

  const yahoo = (event) => {
    return makeYahooCalendarUrl.call(this, event);
  };

  return {
    google,
    yahoo,
    ical,
    outlook
  };
};