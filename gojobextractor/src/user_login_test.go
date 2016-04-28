package src_test



import (
    "testing"
//    "fmt"
   
    "github.com/sclevine/agouti"
    am "github.com/sclevine/agouti/matchers"
    gm "github.com/onsi/gomega"
)

func TestUserLoginPrompt(t *testing.T) {
    gm.RegisterTestingT(t)

    driver := agouti.ChromeDriver()
    gm.Expect(driver.Start()).To(gm.Succeed())
    page, err := driver.NewPage(agouti.Browser("chrome"))
    gm.Expect(err).NotTo(gm.HaveOccurred())

//    potato.StartMyApp(3000)

    gm.Expect(page.Navigate("http://careers.stackoverflow.com")).To(gm.Succeed())
    gm.Expect(page).To(am.HaveURL("http://careers.stackoverflow.com/"))
    
//   fmt.Println(page.Title())
	gm.Expect(page.FindByID("content")).To(gm.Succeed())
//     (page.FindByID("content").To(gm.Succeed())
//    gm.Expect(page.Find("#prompt")).To(am.HaveText("Please login!"))
//	gm.Expect(page.Title()).To(am.HaveText("Please login!"))

    gm.Expect(driver.Stop()).To(gm.Succeed()) // calls page.Destroy() automatically
}





//import (
//    
//    . "github.com/onsi/ginkgo"
//    . "github.com/onsi/gomega"
////    . "github.com/sclevine/agouti/matchers"
//    "github.com/sclevine/agouti"
//)
//
//var _ = Describe("UserLogin", func() {
//    var page *agouti.Page
//
//    BeforeEach(func() {
//        var err error
//        page, err = agoutiDriver.NewPage()
//        Expect(err).NotTo(HaveOccurred())
//    })
//
//    AfterEach(func() {
//        Expect(page.Destroy()).To(Succeed())
//    })
//})









//import (
//	
//	"testing"
//    
//    "github.com/sclevine/agouti"
//    am "github.com/sclevine/agouti/matchers"
//    gm "github.com/onsi/gomega"	
////	. "github.com/onsi/ginkgo"
////	. "github.com/onsi/gomega"
////	"github.com/sclevine/agouti"
////	. "github.com/sclevine/agouti/matchers"
//)


//func TestUserLoginPrompt(t *testing.T) {
//	
//	gm.RegisterTestingT(t)
//
//    driver := agouti.Selenium()
//    gm.Expect(driver.Start()).To(gm.Succeed())
//    page, err := driver.NewPage(agouti.Browser("chrome"))
//    gm.Expect(err).NotTo(gm.HaveOccurred())
//
////    potato.StartMyApp(3000)
//
//    gm.Expect(page.Navigate("http://localhost:3000")).To(gm.Succeed())
//    gm.Expect(page).To(am.HaveURL("http://localhost:3000"))
//    gm.Expect(page.Find("#prompt")).To(am.HaveText("Please login!"))
//
//    gm.Expect(driver.Stop()).To(gm.Succeed()) // calls page.Destroy() automatically	
//	
//	
//}


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
//				
//				
//		})
//
//	})
//
//})
