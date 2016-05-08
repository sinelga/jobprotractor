package find_new_offers

import (
	"find_new_offers/findItems"
	"find_new_offers/goOnItemPage"
	"find_new_offers/jobdetails"
	"fmt"
	"gopkg.in/mgo.v2"
	"testing"
	"strconv"	

	gm "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
//	am "github.com/sclevine/agouti/matchers"
)

//var dbsession *mgo.Session

//func init() {
//
//	dbsession, err := mgo.Dial("127.0.0.1")
//	if err != nil {
//		panic(err)
//	}
//	defer dbsession.Close()
//}

func TestFindNewOffers(t *testing.T) {

	dbsession, err := mgo.Dial("127.0.0.1")
	if err != nil {
		panic(err)
	}
	defer dbsession.Close()

	gm.RegisterTestingT(t)
	driver := agouti.ChromeDriver()
	gm.Expect(driver.Start()).To(gm.Succeed())
	page, err := driver.NewPage(agouti.Browser("chrome"))
	gm.Expect(err).NotTo(gm.HaveOccurred())

	for i := 5; i <8 ; i++ {
		
		navigstr := "http://stackoverflow.com/jobs?sort=p&pg="+strconv.Itoa(i)
		gm.Expect(page.Navigate(navigstr)).To(gm.Succeed())
//		gm.Expect(page).To(am.HaveURL("http://stackoverflow.com/jobs?sort=p"))

		items := findItems.FindAllOnPage(*page)

		count_items, err := items.Count()
		if err != nil {
			fmt.Println(err)
		}

		for i := 0; i < count_items; i++ {

			goOnItemPage.GoOn(items.At(i))

			newJobentry := jobdetails.NewJobOffers()

			(*newJobentry).GetAllLinks(page)

			(*newJobentry).FindLocation(page)

			(*newJobentry).ExamDbRecord(*dbsession)

			gm.Expect(page.Back()).To(gm.Succeed())

		}
	}
	//		fmt.Println("ls",)
	gm.Expect(driver.Stop()).To(gm.Succeed()) // calls page.Destroy() automatically

}
