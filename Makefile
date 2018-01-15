install:
	npm install

build:
	docker build -t node-hello .

run: build
	docker run -p 43567:8080 -d node-hello

test: build
	curl localhost:43567

clean:
	rm -rf node_modules


.PHONY: install build run test clean
