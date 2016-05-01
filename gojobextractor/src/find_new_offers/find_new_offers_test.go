package find_new_offers

import (
	"fmt"
	"testing"

	gm "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	am "github.com/sclevine/agouti/matchers"
)

func TestFindNewOffers(t *testing.T) {
	gm.RegisterTestingT(t)
	driver := agouti.ChromeDriver()
	gm.Expect(driver.Start()).To(gm.Succeed())
	page, err := driver.NewPage(agouti.Browser("chrome"))
	gm.Expect(err).NotTo(gm.HaveOccurred())
	gm.Expect(page.Navigate("http://stackoverflow.com/jobs?sort=p")).To(gm.Succeed())
	gm.Expect(page).To(am.HaveURL("http://stackoverflow.com/jobs?sort=p"))

	listResults := page.AllByClass("listResults")
	gm.Expect(listResults.At(1).AllByClass("-item")).Should(am.BeFound())
	items := listResults.At(1).AllByClass("-item")
	gm.Expect(items.Count()).Should(gm.Equal(25))
	count_items, err := items.Count()
	if err != nil {
		fmt.Println(err)
	}
	for i := 0; i < count_items; i++ {

		gm.Expect(items.At(i).FindByClass("-title")).Should(am.BeFound())
		title := items.At(i).FindByClass("-title")

		gm.Expect(title.FindByClass("job-link")).Should(am.BeFound())
		job_link := title.FindByClass("job-link")

		gm.Expect(job_link.Click()).Should(gm.Succeed())

/////

		gm.Expect(page.FindByClass("jobdetail")).Should(am.BeFound())

		jobdetails :=page.FindByClass("jobdetail")

		gm.Expect(jobdetails.FirstByClass("title")).Should(am.BeFound())
		title_on_page :=jobdetails.FirstByClass("title")		
		fmt.Println(title_on_page.Text())
		fmt.Println(title_on_page.Attribute("href"))
		
		gm.Expect(jobdetails.FindByClass("location")).Should(am.BeFound())
		location_on_page :=jobdetails.FirstByClass("location")		
		fmt.Println(location_on_page.Text())		
		
		gm.Expect(page.AllByClass("post-tag")).Should(am.BeFound())
		tags_on_page :=page.AllByClass("post-tag")		
		count_tags,_ :=tags_on_page.Count()
		
		for i := 0; i < count_tags; i++ {
			
//			tag,err :=tags_on_page.At(i).Text()
//			if err != nil {
//				fmt.Println(err)
//			}
			
//			fmt.Println("t->",tag)
		}		
		
		gm.Expect(jobdetails.AllByClass("description")).Should(am.BeFound())
		descriptions_on_page :=jobdetails.AllByClass("description")		
		count_descriptions,_ :=descriptions_on_page.Count()
		
		for i := 0; i < count_descriptions; i++ {
			
			fmt.Println(descriptions_on_page.At(i).Text())
		}		
		
								
		gm.Expect(jobdetails.AllByID("apply")).Should(am.BeFound())
		apply_links := jobdetails.AllByID("apply")

//		fmt.Println(apply_links.Count())

		count, err := apply_links.Count()
		if err != nil {
			fmt.Println(err)
		}

		if count > 0 {

			apply_link, err := apply_links.At(0).Attribute("data-jobid")
			if err != nil {
				fmt.Println(err)
			} else {
				fmt.Println(apply_link)

			}

		}
		
		/////

		gm.Expect(page.Back()).To(gm.Succeed())

	}
	//		fmt.Println("ls",)
	gm.Expect(driver.Stop()).To(gm.Succeed()) // calls page.Destroy() automatically

}
