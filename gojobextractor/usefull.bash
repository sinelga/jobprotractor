stop mongodb

mongodump --dbpath  /var/lib/mongodb
mongorestore --dbpath /var/lib/mongodb dump

start mongodb


export PATH=$PATH:/home/juno/selenium
GOPATH=$GOPATH:/home/juno/git/jobprotractor/gojobextractor go test -v

$GOPATH/bin/ginkgo bootstrap --agouti

GOPATH=$GOPATH:/home/juno/git/jobprotractor/gojobextractor /home/juno/workspace/gocode/bin/ginkgo generate --agouti user_login


db.getCollection('employers').find({"created_at":{ 
    $lt: new Date(), 
    $gte: new Date(new Date().setDate(new Date().getDate()-1))
  }}   )

db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") },"applied":false})
db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") },"externallink":"","applied":false})
db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") },"externallink":/mailto/})
db.getCollection('employers').find({"created_at" : { $gte : new ISODate("2016-05-08T00:00:00Z") },"location":/Finland/})
db.getCollection('employers').find({"externallink":{$ne:""},"location":/Finland/})
db.getCollection('employers').find({"externallink":{$ne:""},"email":{$ne:""},"applied":false,"location":/Finland/})
db.getCollection('employers').find({"externallink":{$ne:""},"email":{$ne:""},"applied":false})
db.getCollection('employers').find({"externallink":"mailto:jobs@nitor.fi?subject=Full%20Stack%20Developer%20(via%20Stack%20Overflow%20Careers)&body=%0d%0a--%0d%0aFound%20via%20Stack%20Overflow%20Careers%0d%0a"}

db.getCollection('employers').find({"location":/Finland/,"externallink":{"$ne": ""},"applied":false})
db.getCollection('employers').find({"externallink":/humany/})


fresh (for server)