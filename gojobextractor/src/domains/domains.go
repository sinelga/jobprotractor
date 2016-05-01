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
	Internallink string
	Externallink string
	Email string
	Hits int
	Created_at time.Time
	Applied bool
	Description string
		
}