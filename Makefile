install:
	yarn install

pre-deploy:
	yarn build

deploy: init
	yarn deploy

ssh-key:
	ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f "gh-pages"

test:
	yarn test