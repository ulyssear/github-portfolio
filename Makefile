install:
	npm install

pre-deploy:
	npm run build

deploy:
	npm run deploy

ssh-key:
	ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f "gh-pages"

test:
	npm test