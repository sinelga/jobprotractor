package send_emails

import (
	"domains"
		"fmt"
	"log"
	"time"
	"net/smtp"
	"gopkg.in/mgo.v2"
	"dbhandler"	
)

func SendAll(dbsession mgo.Session,emails []domains.Email, login string, pass string) {

	for _,email :=range emails {	

		send(dbsession,login, pass, email)
		time.Sleep(3000 * time.Millisecond)
	}



//	for i := 0; i < 4; i++ {
////	for _,email :=range emails {	
//
//		send(dbsession,login, pass, emails[i])
//		time.Sleep(3000 * time.Millisecond)
//	}

}
func send(dbsession mgo.Session,glogin string, gpass string, email domains.Email) {
	from := glogin
	pass := gpass
	
	fmt.Println("TO:",email)
	
//	to := "aleksander.mazurov@gmail.com"
	to :=email.To

	myfrom := "support@mazurov.eu"

	msg := "From: " + myfrom + "\n" +
		"To: " + to + "\n" +
		"Subject:ref: " + email.Subject + "\n\n" +
		email.Body

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return
	}

//	log.Print("sent, visit http://foobarbazz.mailinator.com")
	dbhandler.UpdateExtEmploerEmail(dbsession,email)
	
}
