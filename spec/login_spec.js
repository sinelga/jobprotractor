'use strict';

require('dotenv').load();


describe('stackoverflow.com all jobs',function() {
	
	var fblogin = process.env.fblogin;
	var fbpass = process.env.fbpass;
	
	
	it('make login by', function() {
		
		console.info(fblogin+"-----"+fbpass);
		
		browser.ignoreSynchronization = true;
		browser.get('http://careers.stackoverflow.com');
		
		element(by.css('.-item .test-login')).isPresent().then(function(result) {
			
		if (result) {
			
			console.info("found login buttom");
			
			var loginButtton = element(by.css('.-item .test-login'));
			
			loginButtton.click().then(function(result) {
				
				browser.driver.sleep(5000);
				
				element(by.css('.facebook')).isPresent().then(function(result) {
					
					if (result) {
						console.info("found facebook login buttom");
						var loginFacebookButtton = element(by.css('.facebook'));
						
						loginFacebookButtton.click().then(function(result) {
							
							browser.driver.sleep(5000);
							
							
						});
						
					} else {
						
						console.info("NOT found facebook login buttom");
						
					}
					
					
				});
				
				
				
			});
			
			
			
			
		} else {
			
			console.info("NOT found login buttom");
		}
			
			
			
			
		});
		
		
//		element(by.css('.-item .test-login')).click().then(function(result) {
//			
//			if (result) {
//				
//				console.info("found login buttom");
//				
//			} else {
//				
//				console.info("NOT found login buttom");
//			}
//			
//		});
		
		
		
		
	});
	
	
	
});