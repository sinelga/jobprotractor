exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: [
    'spec/stackoverflow_spec2.js'
//    'spec/login_spec.js'
  ],


  capabilities: {
    'browserName': 'chrome',
//    'browserName': 'firefox',
    'chromeOptions': {'args': ['--disable-extensions']}
  },
  beforeLaunch: function() {
      console.log(' beforeLaunch ');
  },
  
  onPrepare: function () {
//	    global.myVariable = "test";
//	    var myTags = {};
	    global.myTags = {};

	    global.myTags["php"]="2 years";
	    global.myTags["html5"]="3 years";
	    global.myTags["javascript"]="4 years";
	    global.myTags["node.js"]="1 year";
	    global.myTags["google-analytics"]="2 years";
	    global.myTags["analytics"]="2 years";
	    global.myTags["java"]="10 years";
	    global.myTags["java-8"]="2 years";
	    global.myTags["mysql"]="16 years";
	    global.myTags["web-services"]="8 years";
	    global.myTags["web-frontend"]="10 years";
	    global.myTags["sql"]="17 years";
	    global.myTags["sysadmin"]="15 years";
	    global.myTags["unix"]="19 years";
	    global.myTags["css"]="6 years";
	    global.myTags["git"]="4 years";
	    global.myTags["c"]="4 years";
	    global.myTags["cvs"]="8 years";
	    global.myTags["angularjs"]="3 years";
	    global.myTags["python"]="1 year";
	    global.myTags["bash"]="20 years";
	    global.myTags["amazon-web-services"]="5 years";
	    global.myTags["amazon-ec2"]="6 years";
	    global.myTags["maven"]="6 years";
	    global.myTags["rest"]="5 years";
	    global.myTags["go"]="3 years";
	    global.myTags["linux"]="18 years";
	    global.myTags["ruby"]="3 years";
	    global.myTags["j2ee"]="5 years";
	    global.myTags["oracle"]="1 year";
	    global.myTags["oracle11g"]="1 year";
	    global.myTags["tcp"]="10 years";
	    global.myTags["open-source"]="15 years";
	    global.myTags["css3"]="2 years";
	    global.myTags["redis"]="2 years";
	    global.myTags["ruby-on-rails"]="3 years";
	    global.myTags["mongodb"]="1 year";
	    global.myTags["xml"]="6 years";
	    global.myTags["json"]="4 years";
	    global.myTags["hibernate"]="3 years";
	    global.myTags["jpa"]="6 years";
	    global.myTags["ejb"]="2 years";
	    global.myTags["jquery"]="2 years";
	    global.myTags["tcpip"]="20 years";
	    global.myTags["tomcat"]="4 years";
	    global.myTags["bigdata"]="10 years";
	    global.myTags["big-data"]="10 years";
	    global.myTags["google"]="7 years";
	    global.myTags["web"]="20 years";
	    global.myTags["aws"]="8 years";
	    global.myTags["mongo"]="1 year";
	    global.myTags["django"]="1 year";
	    global.myTags["mobile"]="2 years";
	    global.myTags["zend-framework"]="1 year";
	    global.myTags["ubuntu"]="8 years";
	    global.myTags["nginx"]="7 years";
	    global.myTags["angular-fullstack"]="2 years";
	    global.myTags["server-side"]="10 years";
	    global.myTags["virtualization"]="5 years";
	    global.myTags["gentoo"]="4 years";
	    global.myTags["postgresql"]="3 years";
	    global.myTags["plsql"]="3 years";
	    global.myTags["debian"]="5 years";
	    global.myTags["debian-based"]="4 years";
	    global.myTags["cloud"]="6 years";
	    global.myTags["nosql"]="4 years";
	    global.myTags["lamp"]="4 years";
	    global.myTags["less"]="1 year";
	    global.myTags["sass"]="2 years";
	    global.myTags["svn"]="8 years";
	    global.myTags["xslt"]="2 years";
	    global.myTags["docker"]="1 year";
	    global.myTags["google-app-engine"]="5 years";
	    global.myTags["unit-testing"]="5 years";
	    global.myTags["integration-testing"]="2 years";
	    global.myTags["gruntjs"]="2 years";
	    global.myTags["frontend"]="6 years";
	    global.myTags["couchbase"]="1 year";
	    global.myTags["bower"]="2 year";
	    global.myTags["npm"]="2 years";
	    global.myTags["backend"]="7 years";
	    global.myTags["memcached"]="2 years";
	    global.myTags["servlets"]="5 years";
	    global.myTags["unixlinux"]="18 years";
	    global.myTags["gulp"]="1 year";
	    global.myTags["hadoop"]="1 year";
	    global.myTags["scripting"]="20 years";
	    global.myTags["mapreduce"]="1 year";
	    global.myTags["bootstrap"]="2 years";
	    global.myTags["eclipse"]="10 years";
	    global.myTags["stored-procedures"]="7 years";
	    global.myTags["data-archicing"]="17 years";
	    global.myTags["data-server-tuning"]="17 years";
	    global.myTags["solaris"]="3 years";
	    global.myTags["nodes-js"]="1 year";
	    global.myTags["ethernet"]="20 years";
	    global.myTags["github"]="3 years";
	    global.myTags["junit"]="4 years";
	    global.myTags["freebsd"]="1 year";
	    global.myTags["tcp-ip"]="9 years";
	    global.myTags["jboss"]="1 year";
	    global.myTags["soap"]="1 year";
	    global.myTags["express"]="1 year";
	    global.myTags["ionic-framework"]="1 year";
	    global.myTags["responsive-design"]="1 year";
	    global.myTags["webserver"]="20 years";
	    global.myTags["apache"]="5 years";
	    global.myTags["jetty"]="4 years";
	    global.myTags["sql-server-administration"]="18 years";
	    global.myTags["sql-server"]="18 years";
	    global.myTags["smtp"]="10 years";
	    global.myTags["selenium"]="1 year";
	    global.myTags["selenium-webdriver"]="1 year";
	    global.myTags["firewall"]="2 years";
	    global.myTags["web-applications"]="15 years";
	    global.myTags["facebook-sdk"]="1 years";
	    global.myTags["rackspace-cloud"]="2 years";
	    global.myTags["seo"]="7 years";
	    global.myTags["db"]="20 years";
	    global.myTags["redhat"]="4 years";
	    global.myTags["command-line"]="21 years";
	    global.myTags["database-administration"]="20 years";
	    global.myTags["dependency-injection"]="3 years";
	    global.myTags["voip"]="16 years";
	    global.myTags["cisco"]="1 year";
	    global.myTags["cisco-ios"]="1 year";
	    global.myTags["sip"]="10 years";
	    global.myTags["ant"]="5 years";
	    global.myTags["ajax"]="5 years";
	    global.myTags["web-api"]="5 years";
	    global.myTags["js"]="4 years";
	    global.myTags["networking"]="18 years";
	    global.myTags["jdbc"]="5 years";
	    global.myTags["amazon-s3"]="1 years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    //global.myTags[""]=" years";
	    
  },

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:8000',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 1500000
  }
};
