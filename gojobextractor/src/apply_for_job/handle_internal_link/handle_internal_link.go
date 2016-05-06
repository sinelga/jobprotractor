package handle_internal_link

import (
	"domains"
	"fmt"
	
	gm "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	am "github.com/sclevine/agouti/matchers"
	"time"
)

type InternalJobOffer struct {
	Id           string
	Company      string
	Title        string
	Location     string
	Tags         []string
	Externallink string
	Email        string
	Hits         int
	Created_at   time.Time
	Applied      bool
	Description  string
}

func NewInternalJobOffers(job domains.JobOffer) *InternalJobOffer {

	return &InternalJobOffer{

		Id:           job.Id,
		Company:      job.Company,
		Title:        job.Title,
		Location:     job.Location,
		Tags:         job.Tags,
		Externallink: job.Externallink,
		Email:        job.Email,
		Hits:         job.Hits,
		Created_at:   job.Created_at,
		Applied:      job.Applied,
		Description:  job.Description,
	}

}

func (jo *InternalJobOffer) Apply(page *agouti.Page) {

	//	gm.Expect(page.FirstByName("data-jobid")).Should(am.BeFound())
	//
	//	linktoclick :=page.FirstByName("data-jobid")
	//
	//	jo.ParceLink(linktoclick)
	//
	gm.Expect(page.FindByClass("jobdetail")).Should(am.BeFound())

	jobdetails := page.FindByClass("jobdetail")

	alllinks := jobdetails.All("a")

	count_links, _ := alllinks.Count()

	var idtoapply int
	for i := 0; i < count_links; i++ {

		data_jobid, _ := alllinks.At(i).Attribute("data-jobid")
		if data_jobid != "" {
			text, _ := alllinks.At(i).Text()
			if text == "apply now" {
				idtoapply = i

			}

		}

		//		jo.ParceLink(alllinks.At(i))

	}

	jo.ElaborateFrame(page, alllinks.At(idtoapply))
	//	fmt.Println(alllinks.At(idtoapply))
	//	gm.Expect(alllinks.At(idtoapply).Click()).To(gm.Succeed())
	//	gm.Expect(alllinks.At(idtoapply).SwitchToFrame()).To(gm.Succeed())
}

func (jo *InternalJobOffer) ElaborateFrame(page *agouti.Page, link *agouti.Selection) {

	//	fmt.Println(link)
	gm.Expect(link.Click()).To(gm.Succeed())
//	gm.Expect(link.SwitchToFrame()).To(gm.Succeed())
//	gm.Expect(page.SwitchToRootFrame()).To(gm.Succeed())
	
//	fmt.Println(page.HTML())
//	
//	gm.Expect(page.FindByID("CandidateName")).Should(am.BeFound())
//	
	gm.Expect(page.FindByID("apply-dialog")).Should(am.BeFound())
	form :=page.FindByID("apply-dialog")
	fmt.Println(form.Text())
//	form.SwitchToFrame()
//	fmt.Println(form.HTML())
	time.Sleep(2000 * time.Millisecond)
	gm.Expect(form.FindByClass("apply-form")).Should(am.BeFound())
	fmt.Println(form.FindByClass("apply-form"))
	time.Sleep(2000 * time.Millisecond)		
	
	
	gm.Expect(form.All("input")).Should(am.BeFound())

	allinputs := form.All("input")

	count_inputs, _ := allinputs.Count()
//
	fmt.Println(allinputs, count_inputs)
	var idtoinput int
	for i := 0; i < count_inputs; i++ {

		type_atr, _ := allinputs.At(i).Attribute("type")

		if type_atr != "" {

			if type_atr == "file" {
				
				idtoinput=i			
				
			} 
			
		}

	}
//	
	fmt.Println("idtoinput",idtoinput)
//	
	gm.Expect(allinputs.At(idtoinput).Click()).To(gm.Succeed())
	gm.Expect(allinputs.At(idtoinput).UploadFile("/home/juno/git/cv/version_desk_react_00/dist/mazurov_cv.pdf")).To(gm.Succeed())
	
	
	gm.Expect(form.FindByID("CoverLetter")).Should(am.BeFound())
	coverletter :=form.FindByID("CoverLetter")
	coverletter.SendKeys("OK")
	
	

}
