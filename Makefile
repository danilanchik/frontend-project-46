install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test-coverage:
	npm run test -- --coverage --coverageProvider=v8

test:
	npm test