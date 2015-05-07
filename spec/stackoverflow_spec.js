/**
 * 
 */

'use strict';

describe('stackoverflow.com all jobs', function() {
	it('should get page title', function() {
		browser.ignoreSynchronization = true;
		browser.get('http://careers.stackoverflow.com/jobs');

		expect(browser.getTitle()).toEqual(
				'Job Listings - Stack Overflow Careers');

	});

	it('get all jobs', function() {
		browser.ignoreSynchronization = true;
		browser.get('http://careers.stackoverflow.com/jobs');


		var alljobs = element.all(by.css('.listResults .-item'));

		alljobs.count().then(function(qjobs) {

//			console.log(qjobs);

			for (var i = 0; i < qjobs; ++i) {

				alljobs.get(i).getText().then(function(text) {

					console.log(text);
//					alljobs.get(i).
					

				});
				
//				console.log(alljobs.get(i).getText());

			}

		});

		// console.log(alljobs.count());

		// for (var i = 0; i < alljobs.length; ++i) {
		//			
		// alljobs.get(i).getText().then(function(text) {
		//				
		// console.log(text);
		//				
		// });
		//			
		// }

		// element.all(by.css('.listResults
		// .-item')).get(0).getText().then(function(text) {
		// console.log(text);
		// });

		// var jobs = element.all(by.tagName('data-jobid'));

		// expect(jobs.count()).toEqual(2);

	});

});