package dbhandler

import (
	"domains"
	"fmt"
	"gopkg.in/mgo.v2"
	"log"
)

func InsertRecord(dbsession mgo.Session, joboffer domains.JobOffer) {

	dbsession.SetMode(mgo.Monotonic, true)

	c := dbsession.DB("cv_employers").C("employers")

	fmt.Println(joboffer)

	err := c.Insert(joboffer)
	if err != nil {
		log.Fatal(err)
	}

}
