export PATH=$PATH:/home/juno/selenium
GOPATH=$GOPATH:/home/juno/git/jobprotractor/gojobextractor go test -v

$GOPATH/bin/ginkgo bootstrap --agouti

GOPATH=$GOPATH:/home/juno/git/jobprotractor/gojobextractor /home/juno/workspace/gocode/bin/ginkgo generate --agouti user_login


