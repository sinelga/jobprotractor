package find_emploers_for_email

import (
	"dbhandler"
	"domains"
//	"fmt"
	"gopkg.in/mgo.v2"
	"net/url"
	"strings"
)

func FindEmpl(dbsession mgo.Session) []domains.JobOffer {

	results := dbhandler.ExternalEmploers(dbsession)

	var to_email_emploers []domains.JobOffer

	for _, result := range results {

		if strings.HasPrefix(result.Externallink, "mailto:") {

			u, err := url.Parse(result.Externallink)
			if err != nil {
				panic(err)
			}
			
			cleanemail := strings.TrimLeft(strings.TrimRight(result.Externallink,u.RawQuery),"mailto:")
//			fmt.Println(result.Externallink)
						
//			fmt.Println("cleanemail:",cleanemail[0:len(cleanemail)-1])
			cleanemail =cleanemail[0:len(cleanemail)-1]
			result.Email=cleanemail
//			result.Email="aleksander.mazurov@gmail.com"
			
			to_email_emploers = append(to_email_emploers, result)

		} else if result.Email != "" && !strings.HasPrefix(result.Externallink, "mailto:") {

			to_email_emploers = append(to_email_emploers, result)

		}
	}

	return to_email_emploers
}
