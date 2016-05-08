package dbhandler

import (
	"domains"
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
)

func InsertRecord(dbsession mgo.Session, joboffer domains.JobOffer) {

	dbsession.SetMode(mgo.Monotonic, true)

	c := dbsession.DB("cv_employers").C("employers")

	count, err := c.Find(bson.M{"id": joboffer.Id}).Limit(1).Count()
	if err != nil {

		log.Fatal(err)
	}
//	fmt.Println("count", count)

	if count == 0 {

		err := c.Insert(joboffer)
		if err != nil {
			log.Fatal(err)
		}
	} else {
		fmt.Println("EXIST", count, joboffer)

	}

}

func FindNotApplyedEmployers(dbsession mgo.Session) []domains.JobOffer {

	dbsession.SetMode(mgo.Monotonic, true)

	c := dbsession.DB("cv_employers").C("employers")

	var results []domains.JobOffer
	err := c.Find(bson.M{"externallink": "", "applied": false}).All(&results)
	if err != nil {

		log.Fatal(err)
	}

	return results

}

func UpdateEmployer(dbsession mgo.Session, joboffer domains.JobOffer) {

//	fmt.Println(joboffer)

	dbsession.SetMode(mgo.Monotonic, true)

	c := dbsession.DB("cv_employers").C("employers")

	err := c.Update(bson.M{"id": joboffer.Id}, joboffer)
	if err != nil {

		log.Fatal(err)
	}

}
