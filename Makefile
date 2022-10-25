ifeq ($(OS),Windows_NT) 
    detected_OS := Windows
else
    detected_OS := $(shell sh -c 'uname 2>/dev/null || echo Unknown')
endif

init:
ifeq ($(detected_OS),Windows)
	@set NODE_OPTIONS=--openssl-legacy-provider
else
	export NODE_OPTIONS="--openssl-legacy-provider"
endif

install:
	yarn install

build:
	yarn build

deploy:
	yarn deploy

ssh-key:
	ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f "gh-pages"