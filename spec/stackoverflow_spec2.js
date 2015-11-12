'use strict';

require('dotenv').load();


var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/remotejob';


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


function insertinDB(employer_name,employer_location,employer_joblink_href,employer_tags,cb){
	
	MongoClient.connect(url,function(err, db) {
		assert.equal(null,err);

		var collection = db.collection('employers');
		var currentTime = new Date();

		var employerdbobj = {
			name : employer_name,
			location : employer_location,
			joblink_href : employer_joblink_href,
			tags: employer_tags
		};

		collection.findAndModify(employerdbobj,
				  [['_id','asc']],  // sort order
				  { $inc: { hits: 1 },$setOnInsert: { date:  currentTime} },
				  {'new': true,upsert: true}, // options
				  function(err, object) {					  
					  cb(err, object);
					  db.close();
				      
				  });		
	});
		
};



function get_all_job_links(page) {
	browser.ignoreSynchronization = true;
	browser.get('http://careers.stackoverflow.com/jobs?sort=p&pg=' + page);


	element.all(by.css('.listResults .-item')).then(function(alljobs) {
				
		console.log("alljobs",alljobs.length);
		loop_joblinks(page,alljobs.length);
		

	});

};

function elaboratelink(btn) {
//	console.log(btn);
	btn.getAttribute('data-scjid').then(function(result) {
		browser.driver.sleep(5000);
		if (result) {
			console.info("submitButtton.get_data-scjid -->"+result);
			btn.click().then(function(result) {
								
			});
			
		} else {
			console.info("NO submitButtton.get_data-scjid!!");
			
		}	
		
	});
	
};

function loop_joblinks(page,lastpos){
	
	for (var pos=0;pos < lastpos;pos++) {
		
		browser.get('http://careers.stackoverflow.com/jobs?sort=p&pg='+page);
//		
		var alljobsloop = element.all(by.css('.listResults .-item'));
				
		alljobsloop.get(pos).element(by.css('.job-link')).click().then(function(result) {
	
			browser.driver.sleep(500);
			
			element(by.id('hed')).isPresent().then(function(result) {

				if (result) {
				
				var link = element(by.id('hed')).element(by.tagName('h1')).element(by.tagName('a'));
				
				link.getAttribute('href').then(function(result) {
					
					employer_joblink_href= result;
					
				});
				
				element(by.id('hed')).element(by.css('.employer')).getText().then(function(result) {
					employer_name = result;								
				});
				
				element.all(by.css('.post-tag')).getText().then(function(result) {

					employer_tags.length=0;
					myexperience.length=0;
					
					for (var i=0; i < result.length; i++){
															
						if (result[i] !=='') {
								
							employer_tags.push(result[i]);
								
							if (result[i] in myTags) {

								myexperience.push(result[i]+" <---> "+global.myTags[result[i]]+"\n");												
									
							}																						
						}																		
					}
																																					
				});
				
				element(by.id('hed')).element(by.css('.location')).getText().then(function(result) {
//					console.log("location "+result);
					employer_location = result;
					
				});	
				
				
				
				}
				
			});
			
			
			insertinDB(employer_name,employer_location,employer_joblink_href,employer_tags,function(err, object){
				
				console.log("object "+object.value.hits);
				hits = object.value.hits;
				
			});
			
			if (hits === 1) {
				
				console.log(" Ok hits"+hits);
				
				element(by.css('.careers-btn')).isPresent().then(function(result) {
					
					if (result) {
						console.log(" Ok.careers-btn");
						
						var submitButtton = element(by.css('.careers-btn'));
						
						elaboratelink(submitButtton); 
						
					} else {
						
						console.log(" NO .careers-btn");
					}
					
					
					
				});
				
				
				
				
			} else {
				
				console.log("Was before "+hits);
				
				
			}
									
			
			browser.driver.sleep(15000);
			
			
		});
		
		
	};
	
	
	
};

function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
	}

var employer_name = '';
var employer_location = '';
var employer_joblink_text ='';
var employer_joblink_href ='';
var employer_tags =[];			
var myexperience=[];
var hits =0;


describe('stackoverflow.com all jobs', function() {
	
//	var employer_name = '';
//	var employer_location = '';
//	var employer_joblink_text ='';
//	var employer_joblink_href ='';
//	var employer_tags =[];			
//	var myexperience=[];
	

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