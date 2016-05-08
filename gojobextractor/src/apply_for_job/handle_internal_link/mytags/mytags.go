package mytags

import (
	"encoding/csv"
	"fmt"
	"os"
	"domains"
)

var mystagstoret []domains.Tags

func GetMyTags(tagscsv string,employertags []string) []domains.Tags {
	csvfile, err := os.Open(tagscsv)
	if err != nil {
		fmt.Println(err)
	}
	reader := csv.NewReader(csvfile)
	reader.LazyQuotes = true

	records, err := reader.ReadAll()

	m := make(map[string]string)

	for _,record := range records {
		
		m[record[0]] = record[1]
				
	}
	
	for _,employertag := range employertags {
		
		_, ok := m[employertag]
		
		if ok {
			
			toappend := domains.Tags{employertag,m[employertag]}
			
			mystagstoret =append(mystagstoret,toappend)			
			
		}
		
		
	}
	
	
	

	return mystagstoret
}
