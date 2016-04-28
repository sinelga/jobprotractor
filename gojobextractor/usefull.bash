export PATH=$PATH:/home/juno/selenium

/home/juno/workspace/gocode/bin/ginkgo bootstrap --agouti

GOPATH=$GOPATH:/home/juno/git/jobprotractor/gojobextractor /home/juno/workspace/gocode/bin/ginkgo generate --agouti user_login


