package domains

import (
	"time"
)

type Email struct {
	
	To string
	Subject	string
	Body string
	
}

type ServerConfig struct {
	Login struct {
		Glogin     string
	
	}
	Pass struct {
		Gpass        string
	
	}
}

type Tags struct {
	
	Tag string
	Duration string
	
}

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