'use strict';

require('dotenv').load();

var alljobslinks="start";

function make_login_by() {
	var fblogin = process.env.fblogin;
	var fbpass = process.env.fbpass;

	console.info(fblogin + "-----" + fbpass);

	browser.ignoreSynchronization = true;
	browser.get('http://careers.stackoverflow.com');

	element(by.css('.-item .test-login'))
			.isPresent()
			.then(
					function(result) {

						if (result) {

							var loginButtton = element(by
									.css('.-item .test-login'));

							loginButtton
									.click()
									.then(
											function(result) {

												browser.driver.sleep(4000);

												element(by.css('.facebook'))
														.isPresent()
														.then(
																function(result) {

																	if (result) {
																		
																		var loginFacebookButtton = element(by
																				.css('.facebook'));

																		loginFacebookButtton
																				.click()
																				.then(
																						function(
																								result) {

																							browser.driver
																									.sleep(4000);
																							element(
																									by
																											.id('email'))
																									.sendKeys(
																											fblogin);
																							element(
																									by
																											.id('pass'))
																									.sendKeys(
																											fbpass);
																							element(
																									by
																											.id('u_0_2'))
																									.click()
																									.then(
																											function(
																													result) {

																											});

																						});

																	} else {

																		console
																				.info("NOT found facebook login buttom");

																	}

																});

											});

						} else {

							console.info("NOT found login buttom");
						}

					});

};

function get_all_job_links(page) {
	browser.ignoreSynchronization = true;
	browser.get('http://careers.stackoverflow.com/jobs?sort=p&pg=' + page);
	// browser.driver.sleep(5000);
//	element.all(by.css('.listResults .-item')).count().then(function(count) {
//
//		var lastpos = count - 1;
//		console.info('lastpos -->', lastpos);
//
//	});

	element.all(by.css('.listResults .-item')).then(function(alljobs) {
				
		console.log("alljobs",alljobs.length);
		loop_joblinks(1);
		

	});

};

function loop_joblinks(page){
	
	var	lastpos = 24;
//	console.info('lastpos -->',lastpos);
	
	
	
	
	
	for (var pos=0;pos < lastpos;pos++) {
		
		browser.get('http://careers.stackoverflow.com/jobs?sort=p&pg='+page);
		
		var alljobsloop = element.all(by.css('.listResults .-item'));
				
		alljobsloop.get(pos).element(by.css('.job-link')).click().then(function(result) {
			
			browser.driver.sleep(1600);
			console.log("I am here 1");
			
		});
		
		
		
	};
	
	
	
};




describe('stackoverflow.com all jobs', function() {

	it('make login by facebook', function() {

		make_login_by();

	});

	it('get all job links', function(page) {
		
		get_all_job_links(1);
//		
//		console.log("count",alljobslinks);
//
////		var alljobslinks = get_all_job_links(1);
//		
//		get_all_job_links(1).then(function(result) {
//			
//			console.log("count",alljobslinks);
//			
//			console.log(result);
//		});
		


	});

	// it('make loop', function() {
	//		
	//		
	// }

});