package find_emploers_for_email

import (
	"dbhandler"
	"fmt"
	"gopkg.in/mgo.v2"
	"domains"
)

func FindEmpl(dbsession mgo.Session) []domains.JobOffer{

	results := dbhandler.ExternalEmploers(dbsession)

	var to_email_emploers []domains.JobOffer

	for _, result := range results {
		fmt.Println("----------------")
		fmt.Println(result.Externallink,result.Email)
		if result.Email !="" {
			
			to_email_emploers = append(to_email_emploers,result) 			
			
		}
		
		
		
	}
	
	return to_email_emploers 
}
