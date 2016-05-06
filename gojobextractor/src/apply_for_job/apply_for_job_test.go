package apply_for_job

import (
	"dbhandler"
	"fmt"
	gm "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	am "github.com/sclevine/agouti/matchers"
	"gopkg.in/mgo.v2"
	"os"
	"testing"
	"apply_for_job/handle_internal_link"
)

var dbsession *mgo.Session

func TestApply(t *testing.T) {
	dbsession, err := mgo.Dial("127.0.0.1")
	if err != nil {
		panic(err)
	}
	defer dbsession.Close()
	gm.RegisterTestingT(t)

	results := dbhandler.FindNotApplyedEmployers(*dbsession)

	if len(results) > 0 {

		email := os.Getenv("login")
		pass := os.Getenv("pass")
		fmt.Println(email,pass)
		driver := agouti.ChromeDriver()
		gm.Expect(driver.Start()).To(gm.Succeed())
		page, err := driver.NewPage(agouti.Browser("chrome"))
		gm.Expect(err).NotTo(gm.HaveOccurred())
//		gm.Expect(page.Navigate("http://stackoverflow.com/jobs")).To(gm.Succeed())
//		gm.Expect(page).To(am.HaveURL("http://stackoverflow.com/jobs"))
		gm.Expect(page.Navigate("https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2fjobs")).To(gm.Succeed())
		gm.Expect(page).To(am.HaveURL("https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2fjobs"))

		gm.Eventually(page.FindByID("email")).Should(am.BeFound())
		gm.Expect(page.FindByID("email").Fill(email)).To(gm.Succeed())
		gm.Eventually(page.FindByID("password")).Should(am.BeFound())
		gm.Expect(page.FindByID("password").Fill(pass)).To(gm.Succeed())
		gm.Eventually(page.FindByID("submit-button")).Should(am.BeFound())
		gm.Expect(page.FindByID("submit-button").Submit()).To(gm.Succeed())


		for i := 0; i < 1; i++ {
			fmt.Println(results[i].Id)

			gm.Expect(page.Navigate(results[i].Id)).To(gm.Succeed())
			gm.Expect(page).To(am.HaveURL(results[i].Id))
			
			employer :=handle_internal_link.NewInternalJobOffers(results[i])
			(*employer).Apply(page) 

		}
//		gm.Expect(driver.Stop()).To(gm.Succeed())
	}

}
