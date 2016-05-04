package domains

import (
	"time"
)

type JobOffer struct {
	Id string
	Company string
	Title string
	Location string
	Tags []string	
	Externallink string
	Email string
	Hits int
	Created_at time.Time
	Applied bool
	Description string
		
}