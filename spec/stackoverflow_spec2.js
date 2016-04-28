'use strict';

require('dotenv').load();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/remotejob';


function make_simple_login() {
	var login = process.env.login;
	var pass = process.env.pass;
	
	browser.ignoreSynchronization = true;
	browser.get('https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2fjobs');
	browser.driver.sleep(1000);
	element(by.id('email')).sendKeys(login)
	element(by.id('password')).sendKeys(pass)
	element(by.id('submit-button')).click().then(
			function(result) {
				browser.driver.sleep(5000);
								
			});
//	browser.driver.sleep(2000);
	
};




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
																		browser.driver.sleep(5000);
																		

																	} else {

																		console
																				.info("NOT found facebook login buttom");

																	}

																});

											});

						} else {

							console.info("NOT found login buttom");
							browser.driver.sleep(4000);
							
						}

					});

};

function insertinDB(employer_name,employer_location,employer_joblink_href,employer_tags,cb){
	
	console.log("insertinDB employer_joblink_href->",employer_joblink_href);
	
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

function markasManulDB(employer_name,employer_location,employer_joblink_href,employer_tags,cb){
	
	console.log("markasManulDB  employer_joblink_href->",employer_joblink_href);
	
	MongoClient.connect(url,function(err, db) {
		assert.equal(null,err);

		var collection = db.collection('employers');

		var employerdbobj = {
			name : employer_name,
			location : employer_location,
			joblink_href : employer_joblink_href,
			tags: employer_tags
		};

		collection.findAndModify(employerdbobj,
				  [['_id','asc']],  // sort order
				  { $set: {manual: true }},
				  {}, // options
				  function(err, object) {					  
					  cb(err, object);
					  db.close();				      
				  });		
	});
		
};

function addExternalLinkDB(employer_name,employer_location,employer_joblink_href,employer_tags,employer_extlink,cb){
//
	console.log("addExternalLinkDB  employer_joblink_href->",employer_joblink_href);
	
	MongoClient.connect(url,function(err, db) {

		assert.equal(null,err);

		var collection = db.collection('employers');

		var employerdbobj = {
			name : employer_name,
			location : employer_location,
			joblink_href : employer_joblink_href,
			tags: employer_tags
		};

		collection.findAndModify(employerdbobj,
				  [['_id','asc']],  // sort order
				  { $set: {extlink: employer_extlink}},

				  {}, // options
				  function(err, object) {					  
					  cb(err, object);
					  db.close();
				      
				  });		
	});
		
};



function get_all_job_links(page) {
	browser.ignoreSynchronization = true;
	browser.get('http://stackoverflow.com/jobs?sort=p&pg=' + page);

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
				
				browser.driver.sleep(3000);
				
				element.all(by.tagName('iframe')).then(function(result) {
					
					console.log("result ifframe 2",result.length);
					
					if (result.length > 0) {
						
						var applyframe = result[result.length - 1];
						
						applyframe.getAttribute('src').then(function(result) {
							
							browser.driver.sleep(3000);
							
							browser.driver.get(result).then(function(result) {
								browser.driver.sleep(2000);
								
								element(by.id('CoverLetter_ifr')).isPresent().then(function(result) {
									
									browser.driver.sleep(1000);
									if (result) {
										
										browser.switchTo().frame(browser.driver.findElement(by.id('CoverLetter_ifr'))).then(function(result) {
											
											browser.driver.findElement(by.id('tinymce')).clear();
											
											if (myexperience.length >0 ){
												
												browser.driver.findElement(by.id('tinymce')).sendKeys("My myexperience:\n");
												
												for (var i=0; i < myexperience.length; i++){
													
													browser.driver.findElement(by.id('tinymce')).sendKeys(myexperience[i]);																				
												}
																																														
											} else {
												browser.driver.findElement(by.id('tinymce')).sendKeys("For consideration only:\n");
												
											}
											
											browser.driver.findElement(by.id('tinymce')).sendKeys(global.coverletter);
																																												
											browser.driver.sleep(3000);
											browser.driver.switchTo().defaultContent();
																						
											element(by.css('.test-apply-resume')).isPresent().then(function(result) {
												browser.driver.sleep(2000);
																																				
												if (result) {
													
													element(by.css('.test-apply-resume')).click().then(function(result) {
														browser.driver.sleep(2000);
														
														element(by.css('.test-apply-useresume')).click().then(function(result) {
															browser.driver.sleep(2000);
															element(by.css('.test-apply-submit')).click().then(function(result) {
																browser.driver.sleep(1000);
																																
															});
																																													
														});
																																										
													});
													
												} else {
													
													console.log("NO .test-apply-resume??");
													browser.driver.sleep(200000);
																									
												}
												
											});
																																												
										});
										
									}
																											
								});
																								
							});
																					
						});
																		
					}

				});
											
			});
			
		} else {
			console.info("NO submitButtton.get_data-scjid!!");
			console.log("mark as manual");
			
			btn.getAttribute('href').isPresent().then(function(result) {
				
				if (result) {
																	
					btn.getAttribute('href').then(function(result) {
						
						if (result !== null) {
						
							console.info("applyNow button external link -> ",result);
							
							addExternalLinkDB(employer_name,employer_location,employer_joblink_href,employer_tags,result,function(err, object){
								console.log("err->",err,"obj>", object);
								
							});
							
						}
						
					});												
					
				}
																										
			});
									
			
			markasManulDB(employer_name,employer_location,employer_joblink_href,employer_tags,function(err, object){
				console.log("err->",err);
				console.log("object",object);
				
			});	
						
		}	
		
	});
	
};

function loop_joblinks(page,lastpos){
	
	for (var pos=0;pos < lastpos;pos++) {
		
		browser.get('http://stackoverflow.com/jobs?sort=p&pg='+page);
		
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

					employer_location = result;
					
				});	
								
				}
				
			});
						
			insertinDB(employer_name,employer_location,employer_joblink_href,employer_tags,function(err, object){
				
				console.log(object);
				console.log("object "+object.value.hits);
				hits = object.value.hits;
				
			});
			
			if (hits === 1) {
				
				console.log("Ok hits ",hits);
				
//				element(by.css('.careers-btn')).isPresent().then(function(result) {
//					
//					if (result) {
//						console.log(" Ok.careers-btn");
//						
//						var submitButtton = element(by.css('.careers-btn'));
//						
//						elaboratelink(submitButtton); 
//						
//					} else {
//						
//						console.log(" NO .careers-btn");
//					}
//				});
				
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

	it('make login by facebook', function() {

//		make_login_by();
		make_simple_login();

	});

	it('get all job links', function(page) {
		
		get_all_job_links(1);

	});

});