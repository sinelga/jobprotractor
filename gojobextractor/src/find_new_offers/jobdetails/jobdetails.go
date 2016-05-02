package jobdetails

import (
	//	"domains"
	"fmt"
	gm "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	am "github.com/sclevine/agouti/matchers"
	"time"
	//	"strings"
//	"find_new_offers/jobdetails/parseLink"
)

type JobOffer struct {
	Id           string
	Company      string
	Title        string
	Location     string
	Tags         []string
	Internallink string
	Externallink string
	Email        string
	Hits         int
	Created_at   time.Time
	Applied      bool
	Description  string
}

func NewJobOffers() *JobOffer {

	return &JobOffer{

		Id:           "",
		Company:      "",
		Title:        "",
		Location:     "",
		Tags:         []string{},
		Internallink: "",
		Externallink: "",
		Email:        "",
		Hits:         0,
		Created_at:   time.Now(),
		Applied:      false,
		Description:  "",
	}

}

func (jo *JobOffer) GetAllLinks(page *agouti.Page) {

	gm.Expect(page.FindByClass("jobdetail")).Should(am.BeFound())

	jobdetails := page.FindByClass("jobdetail")

	alllinks := jobdetails.All("a")

	count_links, _ := alllinks.Count()

	for i := 0; i < count_links; i++ {

		alink, _ := alllinks.At(i).Attribute("href")

		if alink != "" {
//			fmt.Println(alink)
//			parseLink.Parse(alllinks.At(i))
			jo.ParceLink(alllinks.At(i))

		}
		//		ahtml, _ := alllinks.At(i).Text()
		//
		//		fmt.Println(alink)
		//		fmt.Println(ahtml)
		//
		//		if strings.HasPrefix(alink, "mailto") {
		//			fmt.Println("OK email:",alink)
		//		}

	}

	
}

func (jo *JobOffer) ParceLink(link *agouti.Selection) {
	
	fmt.Println(link.Attribute("href"))
	hits :=jo.Hits
	jo.Hits	= hits+1
	
}


