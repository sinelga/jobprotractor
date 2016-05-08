export PATH=$PATH:/home/juno/selenium
GOPATH=$GOPATH:/home/juno/git/jobprotractor/gojobextractor go test -v

$GOPATH/bin/ginkgo bootstrap --agouti

GOPATH=$GOPATH:/home/juno/git/jobprotractor/gojobextractor /home/juno/workspace/gocode/bin/ginkgo generate --agouti user_login


db.getCollection('employers').find({"created_at":{ 
    $lt: new Date(), 
    $gte: new Date(new Date().setDate(new Date().getDate()-1))
  }}   )

db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") }})
db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") },"externallink":""})
db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") },"externallink":/mailto/})
db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") },"location":/Finland/})


