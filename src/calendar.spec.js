import {calendar} from './calendar';
import * as util from './util';


describe('Calendar factory', function() {
  let Calendar;
	beforeEach(()=> {
    Calendar = calendar();
    let utcTime = Date.UTC(2015,1,22,12,33,32);
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(utcTime));
  });
		
	afterEach(()=> {
		jasmine.clock().uninstall();
	});

	describe('time calculations', () =>{
		it('should format time correctly for calendar url and ics downloads', ()=> {
			const date = new Date();
			const formattedTime = util.formatTime(date);

			expect(formattedTime).not.toMatch(/-/);
			expect(formattedTime).not.toMatch(/\./);
			expect(formattedTime).not.toMatch(/:/);
		});

		it('should format given end time', () =>{
			const startDate = new Date();
			const endDate = new Date();
			endDate.setHours(8);

			const event = {
				end: endDate,
				start: startDate
			};

			const endTime = util.calculateEndTime(event);

			expect(endTime).toBe(util.formatTime(event.end));
		});

		it('should create an end time if none is given', ()=> {
		  const startTime = new Date();
			const duration = 20;

			const endTime = util.calculateEndTime({start: startTime, duration: duration});

			var calculatedEndTime = util.formatTime(
				new Date(startTime.getTime() + (duration * 60000))
			);

			expect(endTime).toBe(calculatedEndTime);
		});
	});

	describe('google calendar', ()=> {
		it('should create a url for setting a Google calendar event', ()=> {
			const end = new Date();
			end.setMinutes(55);

			const event = {
				end,
        start: new Date(),
				duration: 20,
				title: 'Udacity Project 1 due'
			};
			const googleUrl = Calendar.google(event);
			
			var expectedGoogleUrl = 'https://www.google.com/calendar/render?action=TEMPLATE&text=Udacity%20Project%201%20due&dates=20150222T123332Z/20150222T125532Z&details=&location=&sprop=&sprop=name:';
			expect(googleUrl).toBe(expectedGoogleUrl);
		});
	});

	describe('yahoo calendar', ()=> {
		it('should create a url for setting a Yahoo Calendar event', ()=> {
			const start = new Date(Date.UTC(2015,1,1,1,1,1,1));
			const formattedStartTime = util.formatTime(start);

			const event = {
				start,
				duration: 20,
				title: 'Udacity Project 1 due'
			};

			let yahooUrl = Calendar.yahoo(event);
			yahooUrl = yahooUrl.replace(/(st)=(\w*)/, '');

			let expectedYahooUrl = 'http://calendar.yahoo.com/?v=60&view=d&type=20&title=Udacity%20Project%201%20due&st=20150131T170101Z&dur=0020&desc=&in_loc=';
			expectedYahooUrl = expectedYahooUrl.replace(/(st)=(\w*)/, '');

			expect(yahooUrl).toBe(expectedYahooUrl);
		});
	});

	describe('ics download', ()=> {
		it('should make a valid ics data href', ()=> {

			const events = [
				{
					start: new Date(Date.UTC(2015,1,1,1,1,1,1)),
					end: new Date(Date.UTC(2015,1,1,1,1,2,1)),
					duration: 20,
					title: 'Udacity Project 1 due'
				},
				{
					start: new Date(Date.UTC(2015,1,1,2,1,1,1)),
					end: new Date(Date.UTC(2015,1,1,2,1,2,1)),
					duration: 20,
					title: 'Udacity Project 1 due'
				}
			];

			const icsHref = util.makeIcs(events);
			const expectedIcsHref = 'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://localhost:9876/context.html%0ADTSTART:20150201T010101Z%0ADTEND:20150201T010102Z%0ASUMMARY:Udacity%20Project%201%20due%0ADESCRIPTION:%0ALOCATION:%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://localhost:9876/context.html%0ADTSTART:20150201T020101Z%0ADTEND:20150201T020102Z%0ASUMMARY:Udacity%20Project%201%20due%0ADESCRIPTION:%0ALOCATION:%0AEND:VEVENT%0AEND:VCALENDAR';
			expect(icsHref).toBe(expectedIcsHref);
		});
	});

	describe('outlook calendar', ()=> {
		it('should make an ics download', ()=> {
			
			const event = {
				start: new Date(Date.UTC(2015,1,1,1,1,1,1)),
				duration: 0
			};
      spyOn(util, 'makeIcs');

			const icsHref = Calendar.outlook(event);

			expect(util.makeIcs).toHaveBeenCalledWith(event);
		});
	});

	describe('ical calendar', ()=> {
		it('should make an ics download', ()=> {
			spyOn(util, 'makeIcs');
		  const event = {
				start: new Date(),
				duration: 0
			};

			const icsHref = Calendar.ical(event);
			expect(util.makeIcs).toHaveBeenCalledWith(event);
		});
	})
});