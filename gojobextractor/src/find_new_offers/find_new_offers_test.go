package find_new_offers

import (
	"find_new_offers/findItems"
	"find_new_offers/goOnItemPage"
	"find_new_offers/jobdetails"
	"fmt"
	"gopkg.in/mgo.v2"
	"testing"

	gm "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	am "github.com/sclevine/agouti/matchers"
)

var dbsession *mgo.Session

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
	gm.Expect(page.Navigate("http://stackoverflow.com/jobs?sort=p")).To(gm.Succeed())
	gm.Expect(page).To(am.HaveURL("http://stackoverflow.com/jobs?sort=p"))

	items := findItems.FindAllOnPage(*page)

	count_items, err := items.Count()
	if err != nil {
		fmt.Println(err)
	}

	for i := 0; i < count_items; i++ {

		goOnItemPage.GoOn(items.At(i))

		newJobentry := jobdetails.NewJobOffers()
		//		fmt.Println(newJobentry)

		(*newJobentry).GetAllLinks(page)

		//		fmt.Println(newJobentry)
//		(*newJobentry).
		
		(*newJobentry).FindLocation(page)
		

		(*newJobentry).ExamDbRecord(*dbsession)

		//		fmt.Println(newJobentry.Hits)

		//		if link != nil {
		//
		//			(*newJobentry).ParceLink(link)
		//		}

		//		gm.Expect(page.FindByClass("jobdetail")).Should(am.BeFound())
		//
		//		jobdetails :=page.FindByClass("jobdetail")
		//
		//		gm.Expect(jobdetails.FirstByClass("title")).Should(am.BeFound())
		//		title_on_page :=jobdetails.FirstByClass("title")
		//		fmt.Println(title_on_page.Text())
		//		fmt.Println(title_on_page.Attribute("href"))
		//
		//		gm.Expect(jobdetails.FindByClass("location")).Should(am.BeFound())
		//		location_on_page :=jobdetails.FirstByClass("location")
		//		fmt.Println(location_on_page.Text())
		//
		//		gm.Expect(page.AllByClass("post-tag")).Should(am.BeFound())
		//		tags_on_page :=page.AllByClass("post-tag")
		//		count_tags,_ :=tags_on_page.Count()
		//
		//		for i := 0; i < count_tags; i++ {
		//
		////			tag,err :=tags_on_page.At(i).Text()
		////			if err != nil {
		////				fmt.Println(err)
		////			}
		//
		////			fmt.Println("t->",tag)
		//		}
		//
		//		gm.Expect(jobdetails.AllByClass("description")).Should(am.BeFound())
		//		descriptions_on_page :=jobdetails.AllByClass("description")
		//		count_descriptions,_ :=descriptions_on_page.Count()
		//
		//		for i := 0; i < count_descriptions; i++ {
		//
		////			fmt.Println(descriptions_on_page.At(i).Text())
		//		}
		//
		//
		//		gm.Expect(jobdetails.AllByID("apply")).Should(am.BeFound())
		//		apply_links := jobdetails.AllByID("apply")
		//
		//		count, err := apply_links.Count()
		//		if err != nil {
		//			fmt.Println(err)
		//		}
		//
		//		if count > 0 {
		//
		//			apply_link, err := apply_links.At(0).Attribute("data-jobid")
		//			if err != nil {
		//				fmt.Println(err)
		//			} else {
		//				fmt.Println(apply_link)
		//
		//			}
		//
		//		}

		//Email

		//		alllinks := jobdetails.All("a")
		//
		//		count_emails,_ :=alllinks.Count()
		//
		//
		//		for i := 0; i < count_emails; i++ {
		//
		//			alink,_ :=alllinks.At(i).Attribute("href")
		//			ahtml,_ :=alllinks.At(i).Text()
		//
		////			fmt.Println(alink)
		//			fmt.Println(ahtml)
		//
		//			if strings.HasPrefix(alink,"mailto") {
		//				fmt.Println(alink)
		//			}
		//
		//		}

		/////

		gm.Expect(page.Back()).To(gm.Succeed())

	}

	//		fmt.Println("ls",)
	gm.Expect(driver.Stop()).To(gm.Succeed()) // calls page.Destroy() automatically

}
