/**
 * 
 */

'use strict';

require('dotenv').load();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/remotejob';

var page=55;
//last page=14;
//var pos =24;

var myTags = {};

myTags["php"]="2 years";
myTags["html5"]="3 years";
myTags["javascript"]="4 years";
myTags["node.js"]="1 year";
myTags["google-analytics"]="2 years";
myTags["analytics"]="2 years";
myTags["java"]="10 years";
myTags["java-8"]="2 years";
myTags["mysql"]="16 years";
myTags["web-services"]="8 years";
myTags["web-frontend"]="10 years";
myTags["sql"]="17 years";
myTags["sysadmin"]="15 years";
myTags["unix"]="19 years";
myTags["css"]="6 years";
myTags["git"]="4 years";
myTags["c"]="4 years";
myTags["cvs"]="8 years";
myTags["angularjs"]="3 years";
myTags["python"]="1 year";
myTags["bash"]="20 years";
myTags["amazon-web-services"]="5 years";
myTags["amazon-ec2"]="6 years";
myTags["maven"]="6 years";
myTags["rest"]="5 years";
myTags["go"]="3 years";
myTags["linux"]="18 years";
myTags["ruby"]="3 years";
myTags["j2ee"]="5 years";
myTags["oracle"]="1 year";
myTags["oracle11g"]="1 year";
myTags["tcp"]="10 years";
myTags["open-source"]="15 years";
myTags["css3"]="2 years";
myTags["redis"]="2 years";
myTags["ruby-on-rails"]="3 years";
myTags["mongodb"]="1 year";
myTags["xml"]="6 years";
myTags["json"]="4 years";
myTags["hibernate"]="3 years";
myTags["jpa"]="6 years";
myTags["jquery"]="2 years";
myTags["tcpip"]="20 years";
myTags["tomcat"]="4 years";
myTags["bigdata"]="10 years";
myTags["big-data"]="10 years";
myTags["google"]="7 years";
myTags["web"]="20 years";
myTags["aws"]="8 years";
myTags["mongo"]="1 year";
myTags["django"]="1 year";
myTags["mobile"]="2 years";
myTags["zend-framework"]="1 year";
myTags["ubuntu"]="8 years";
myTags["nginx"]="7 years";
myTags["angular-fullstack"]="2 years";
myTags["server-side"]="10 years";
myTags["virtualization"]="5 years";
myTags["gentoo"]="4 years";
myTags["postgresql"]="3 years";
myTags["plsql"]="3 years";
myTags["debian"]="5 years";
myTags["debian-based"]="4 years";
myTags["cloud"]="6 years";
myTags["nosql"]="4 years";
myTags["lamp"]="4 years";
myTags["less"]="1 year";
myTags["sass"]="2 years";
myTags["svn"]="8 years";
myTags["xslt"]="2 years";
myTags["docker"]="1 year";
myTags["google-app-engine"]="5 years";
myTags["unit-testing"]="5 years";
myTags["gruntjs"]="2 years";
myTags["frontend"]="6 years";
myTags["couchbase"]="1 year";
myTags["bower"]="2 year";
myTags["npm"]="2 years";
myTags["backend"]="7 years";
myTags["memcached"]="2 years";
myTags["servlets"]="5 years";
myTags["unixlinux"]="18 years";
myTags["gulp"]="1 year";
myTags["hadoop"]="1 year";
myTags["scripting"]="20 years";
myTags["mapreduce"]="1 year";
myTags["bootstrap"]="2 years";
myTags["eclipse"]="10 years";
myTags["stored-procedures"]="7 years";
myTags["data-archicing"]="17 years";
myTags["data-server-tuning"]="17 years";
myTags["solaris"]="3 years";
myTags["nodes-js"]="1 year";
myTags["ethernet"]="20 years";
myTags["github"]="3 years";
myTags["junit"]="4 years";
myTags["freebsd"]="1 year";
myTags["tcp-ip"]="9 years";
myTags["jboss"]="1 year";
myTags["soap"]="1 year";
myTags["express"]="1 year";
myTags["ionic-framework"]="1 year";
myTags["responsive-design"]="1 year";
myTags["webserver"]="20 years";
myTags["apache"]="5 years";
myTags["jetty"]="4 years";
myTags["sql-server-administration"]="18 years";
myTags["smtp"]="10 years";
myTags["selenium"]="1 year";
myTags["selenium-webdriver"]="1 year";
myTags["firewall"]="2 years";
myTags["web-applications"]="15 years";
myTags["facebook-sdk"]="1 years";
myTags["rackspace-cloud"]="2 years";
myTags["seo"]="7 years";
myTags["db"]="20 years";
myTags["redhat"]="4 years";
myTags["command-line"]="21 years";
myTags["database-administration"]="20 years";
myTags["dependency-injection"]="3 years";
myTags["voip"]="16 years";
myTags["cisco"]="1 year";
myTags["cisco-ios"]="1 year";
myTags["sip"]="10 years";
//myTags[""]=" years";
//myTags[""]=" years";
//myTags[""]=" years";

var coverletter =[
"Hello! I'am Alex Mazurov.",
"I started use Linux from kernel 0.98 version it was 1993 and I still use it. So if you are need any kind support in programming and/or your business based on Linux it's right place.",
"Actually I am looking for REMOTE job.",
"Particularly I can be useful in Telecommunication, Web Application, Database fields.",
"My speaking languages: English,Italian,Russian.",
"But I am living in Finland.",
"Actually my projects mostly Web App: Angularjs <---> backend (GoLang/Nodejs)",
"Development: Eclipse <--->  GitHub.",
"I hope you find all necessary information on Sites. http://mazurov.eu https://github.com/sinelga"
 ].join("\n");

function insertinDB(employer_name,employer_location,employer_joblink_href,employer_tags,cb){
//	
	MongoClient.connect(url,function(err, db) {
		assert.equal(null,err);
//		console.log("Connected correctly to server");

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
//	
	MongoClient.connect(url,function(err, db) {
		assert.equal(null,err);
//		console.log("Connected correctly to server");

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
	MongoClient.connect(url,function(err, db) {
		assert.equal(null,err);
//		console.log("Connected correctly to server");

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




describe('stackoverflow.com all jobs',function() {

			var employer_name = '';
			var employer_location = '';
			var employer_joblink_text ='';
			var employer_joblink_href ='';
			var employer_tags =[];			
			var myexperience=[];
			
			var fblogin = process.env.fblogin;
			var fbpass = process.env.fbpass;

			it('make login by', function() {
				
				browser.ignoreSynchronization = true;
				browser.get('http://careers.stackoverflow.com');
				
				element(by.css('.-item .test-login')).click().then(function(result) {
					
					element(by.css('.facebook')).click().then(function(result) {
						
						element(by.id('email')).sendKeys(fblogin);
						element(by.id('pass')).sendKeys(fbpass);
						element(by.id('u_0_2')).click().then(function(result) {
																					
						});
																		
					});
																
				});

			});

			it('get all jobs',function() {
						browser.ignoreSynchronization = true;
						browser.get('http://careers.stackoverflow.com/jobs?sort=p&pg='+page);

						element.all(by.css('.listResults .-item')).count().then(function(count) {
						var	lastpos = count-1;
							console.info('lastpos -->',lastpos);

						for (var pos=0;pos < lastpos;pos++) {
//							for (var pos=10;pos < lastpos;pos++) {	
							
						
							employer_tags =[];			
							myexperience=[];
							
							browser.get('http://careers.stackoverflow.com/jobs?sort=p&pg='+page);	
						
							var alljobs = element.all(by.css('.listResults .-item'));
						
							alljobs.get(pos).element(by.css('.job-link')).getAttribute('href').then(function(result) {
							
								if (result !== null) {
									console.info("submit ->",result);
								}
							
							});
						

						alljobs.get(pos).element(by.css('.job-link')).click().then(function(result) {

						browser.driver.sleep(1600);
						
						element(by.id('hed')).isPresent().then(function(result) {
							
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

											myexperience.push(result[i]+" <---> "+myTags[result[i]]+"\n");												
												
										}
																						
									}									
									
								}
																																								
							});							
							
							
							
							element(by.id('hed')).element(by.css('.location')).getText().then(function(result) {
								employer_location = result;
								
								insertinDB(employer_name,employer_location,employer_joblink_href,employer_tags,function(err, object){
									
									console.log("err->",err,"obj>", object.value.hits);
									browser.driver.sleep(2000);
									
									if (object.value.hits === 1) {
										
										element(by.css('.careers-btn')).isPresent().then(function(result) {
											
											
										if (result) {
										
										
										var submitButtton = element(by.css('.careers-btn'));
										
										submitButtton.getAttribute('href').isPresent().then(function(result) {
											
											if (result) {
												
												
												submitButtton.getAttribute('href').then(function(result) {
													
													if (result !== null) {
													
														console.info("applyNow button-> ",result);
														
														addExternalLinkDB(employer_name,employer_location,employer_joblink_href,employer_tags,result,function(err, object){
															console.log("err->",err,"obj>", object.value.hits);
															
														});
														
													}
													
												});
												
												
											}
											
											
											
										});
										
																				
																				
										
										submitButtton.click().then(function(result) {
											
											browser.driver.sleep(2000);
																						
											var allframes = element.all(by.tagName('iframe')).then(function(result) {
												
												console.log("result ifframe 2",result.length);
												
												if (result.length > 0) {
												
												var applyframe = result[result.length - 1];
												
												applyframe.getAttribute('src').then(function(result) {
													
													
													browser.driver.get(result).then(function(result) {
														
														element(by.id('CoverLetter_ifr')).isPresent().then(function(result) {
															
															if (result) {
																browser.switchTo().frame(browser.driver.findElement(by.id('CoverLetter_ifr'))).then(function(result) {
																																																		
																																
																expect(element(by.id('tinymce')).isPresent()).toBe(true);
																browser.driver.findElement(by.id('tinymce')).clear();
																
																																
																if (myexperience.length >0 ){
																	
																	browser.driver.findElement(by.id('tinymce')).sendKeys("My myexperience:\n");
																	
																	for (var i=0; i < myexperience.length; i++){
																		
																		browser.driver.findElement(by.id('tinymce')).sendKeys(myexperience[i]);
																		
																	}
																																																			
																} else {
																	browser.driver.findElement(by.id('tinymce')).sendKeys("For consideration only:\n");
																	
																}																
																																
																browser.driver.findElement(by.id('tinymce')).sendKeys(coverletter);
																																
																
																browser.driver.switchTo().defaultContent();
																																
																browser.driver.findElement(by.tagName('button')).click().then(function(result) {

																	browser.driver.sleep(2000);
																																		
																	
																	element(by.css('.test-apply-useresume')).isPresent().then(function(result) {
																		
//																		console.info(".test-apply-useresume ",result);
																		
																		element(by.css('.test-apply-useresume')).getText().then(function(result) {
																			
																			console.info(".test-apply-useresume ",result);
																		});
																		
																		if (result) {
																			
																			element(by.css('.test-apply-useresume')).click().then(function(result) {
																				
																				browser.driver.sleep(1000);
																				element(by.css('.test-apply-submit')).click();
																																								
																			});																			
																			
																		}
																																																						
																	});
																																	
																});
																browser.driver.sleep(5000);
																
																});
																
															} else {
																
																console.info('CoverLetter_ifr Not present');
																
																markasManulDB(employer_name,employer_location,employer_joblink_href,employer_tags,function(err, object){
																	console.log("err->",err,"obj>", object.value.hits);
																	
																});
																																
															}
															
															
														});
																																										
													
													});
													
													
												});
																								
												
												} else {// no frame 
													
													console.info('Not frame so manual');
													
													
													markasManulDB(employer_name,employer_location,employer_joblink_href,employer_tags,function(err, object){
														console.log("err->",err,"obj>", object.value.hits);
														
													});																										
													
												}
													
												});

											});
										} else {
											
											console.info('not exist .careers-btn make manual');
											markasManulDB(employer_name,employer_location,employer_joblink_href,employer_tags,function(err, object){
												console.log("err->",err,"obj>", object.value.hits);
												
											});		
											
											
										}
										
										});//

									} else {// old jobprovider	hits > 1	
										
										
										console.info('Old employer hits > 1?');
																				
									} 

									
										});
									
																																																			
								});
										
														
							});
																												
						
						});

						browser.driver.sleep(15000);

					
						
				}		//alljobs
			}); //count pos		
				browser.driver.sleep(5000);		

			});
		});	
			