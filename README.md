# Kubernetes node.js example app

## To build a container:
docker build -t tlitovsk/kubernetes-nodejs-helloworld:ver1 .
docker build -t tlitovsk/kubernetes-nodejs-helloworld:ver2 .

## Push it
docker push tlitovsk/kubernetes-nodejs-helloworld:ver1
docker push tlitovsk/kubernetes-nodejs-helloworld:ver2

## URL access inside the container
https://159.65.132.157/k8s/clusters/c-swqn4/api/v1/namespaces/example/services/hello-service:8080/proxy/
https://159.65.132.157/k8s/clusters/c-swqn4/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
https://128.199.223.176/hello

## To build the test container
docker build --rm -t tlitovsk/jenkins-jnlp:latest .


