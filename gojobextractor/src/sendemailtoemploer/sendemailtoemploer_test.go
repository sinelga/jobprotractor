package main

import (
    "testing"
    "gopkg.in/mgo.v2"
//    "gopkg.in/gcfg.v1"        
    gm "github.com/onsi/gomega"
    "sendemailtoemploer/find_emploers_for_email"
    "sendemailtoemploer/create_emails"
    "sendemailtoemploer/send_emails"          
    "domains"
//    "fmt"      
)

var results []domains.JobOffer
var emailstosend []domains.Email



func TestAll(t *testing.T) {
	gm.RegisterTestingT(t)	
	dbsession, err := mgo.Dial("127.0.0.1")
	if err != nil {
		panic(err)
	}
	defer dbsession.Close()
	
	
	results =find_emploers_for_email.FindEmpl(*dbsession)	
	gm.Expect(len(results) >0).Should(gm.BeTrue())
	emailstosend =create_emails.Create(results)	
	send_emails.SendAll(*dbsession,emailstosend,glogin,gpass)		

}



