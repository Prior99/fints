default: build lint test

.PHONY: node_modules
node_modules:
	yarn install
	yarn lerna bootstrap

.PHONY: build
build: node_modules
	yarn lerna run build

.PHONY: lint
lint: node_modules
	yarn lint

.PHONY: test
test: node_modules
	yarn lerna run test

.PHONY: clean
clean:
	yarn lerna run clean

.PHONY: publish
publish: node_modules build lint test
	git diff-index --quiet HEAD --
	yarn lerna publish
