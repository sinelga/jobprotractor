package src_test

//
import (
	"fmt"
	"os"
	"testing"
	//   "time"
	gm "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	am "github.com/sclevine/agouti/matchers"
)

func TestUserLoginPrompt(t *testing.T) {
	gm.RegisterTestingT(t)

	email := os.Getenv("login")
	pass := os.Getenv("pass")

	gm.Expect(email).Should(gm.HaveLen(18))

	driver := agouti.ChromeDriver()
	gm.Expect(driver.Start()).To(gm.Succeed())
	page, err := driver.NewPage(agouti.Browser("chrome"))
	gm.Expect(err).NotTo(gm.HaveOccurred())

	gm.Expect(page.Navigate("https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2fjobs")).To(gm.Succeed())
	gm.Expect(page).To(am.HaveURL("https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2fjobs"))

	gm.Eventually(page.FindByID("email")).Should(am.BeFound())
	gm.Expect(page.FindByID("email").Fill(email)).To(gm.Succeed())
	gm.Eventually(page.FindByID("password")).Should(am.BeFound())
	gm.Expect(page.FindByID("password").Fill(pass)).To(gm.Succeed())
	gm.Eventually(page.FindByID("submit-button")).Should(am.BeFound())
	gm.Expect(page.FindByID("submit-button").Submit()).To(gm.Succeed())
	gm.Expect(page).To(am.HaveURL("http://stackoverflow.com/jobs"))

	listResults := page.AllByClass("listResults")
	gm.Expect(listResults.At(1).AllByClass("-item")).Should(am.BeFound())
	items := listResults.At(1).AllByClass("-item")
	gm.Expect(items.Count()).Should(gm.Equal(25))
	for i := 0; i < 25; i++ {
		
		gm.Expect(items.At(i).FindByClass("-title")).Should(am.BeFound())
		
		title :=items.At(i).FindByClass("-title")
		
		gm.Expect(title.FindByClass("job-link")).Should(am.BeFound())
		job_link :=title.FindByClass("job-link")
		
		fmt.Println(job_link.Attribute("href")) 
//		gm.Expect(job_link).Should(am.HaveAttribute("title","title"))
		
//		gm.Expect(job_link).Should()	
				
//		agouti.

	}
	//		fmt.Println("ls",)
	gm.Expect(driver.Stop()).To(gm.Succeed()) // calls page.Destroy() automatically
}

//import (
//
//	. "github.com/onsi/ginkgo"
//	. "github.com/onsi/gomega"
//	"github.com/sclevine/agouti"
//	. "github.com/sclevine/agouti/matchers"
//)
//
//
//var _ = Describe("UserLogin", func() {
//	var page *agouti.Page
//
//	BeforeEach(func() {
//
//		var err error
//		page, err = agoutiDriver.NewPage(agouti.Browser("chrome"))
//		Expect(err).NotTo(HaveOccurred())
//	})
//
//	AfterEach(func() {
//		Expect(page.Destroy()).To(Succeed())
//	})
//
//	It("should manage user authentication", func() {
//
//		By("redirecting the user to the login form from the home page", func() {
//			Expect(page.Navigate("https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2fjobs")).To(Succeed())
//			Expect(page).To(HaveURL("https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2fjobs"))
//		})
//
//		By("allowing the user to fill out the login form and submit it", func() {
//			Eventually(page.FindByID("email")).Should(BeFound())
//			Expect(page.FindByID("email").Fill("support@mazurov.eu")).To(Succeed())
//			Eventually(page.FindByID("password")).Should(BeFound())
//			Expect(page.FindByID("password").Fill("stackexchange1Rel")).To(Succeed())
//			Eventually(page.FindByID("submit-button")).Should(BeFound())
//			Expect(page.FindByID("submit-button").Submit()).To(Succeed())
//
//		})
//
//		By("get_all_job_links", func() {
//
//			Expect(page).To(HaveURL("https://stackoverflow.com/jobs"))
//			Expect(page.AllByClass("listResults")).Should(BeFound())
//			listResults :=page.AllByClass("listResults")
//			Expect(listResults.At(1).AllByClass("-item")).Should(BeFound())
//			items :=listResults.At(1).AllByClass("-item")
//			Expect(items.Count()).Should(Equal(25))
//
//		})
//
//	})
//
//})
