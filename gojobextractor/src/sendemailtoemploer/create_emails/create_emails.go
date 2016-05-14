package create_emails

import (
	"apply_for_job/handle_internal_link/mytags"
	"domains"
	"encoding/csv"
	"fmt"
	"os"
)

func Create(emplayers []domains.JobOffer) []domains.Email {

	var emailstosend []domains.Email

	csvfile, err := os.Open("/home/juno/git/jobprotractor/gojobextractor/coverletter.csv")
	if err != nil {
		fmt.Println(err)
	}
	reader := csv.NewReader(csvfile)
	reader.LazyQuotes = true

	records, err := reader.ReadAll()

	for _, joboffer := range emplayers {

		mytagstoinsert := mytags.GetMyTags("/home/juno/git/jobprotractor/gojobextractor/mytags.csv", joboffer.Tags)

		body := "My experience:\n\n"

		for _, tag := range mytagstoinsert {

			body = body + tag.Tag + " -> " + tag.Duration + "\n"
		}

		for _, record := range records {

			body = body + "\n" + record[0]
		}

		body = body + "\n\nThanks.\nAlex Mazurov"
		body = body + "\n\nAtt:mazurov_cv.pdf"

		emailtxt := domains.Email{joboffer.Email,joboffer.Id, body}

		emailstosend = append(emailstosend, emailtxt)

	}

	return emailstosend
}
