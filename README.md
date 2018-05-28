## Kubernetes node.js example app

#To build a container:
docker build -t tlitovsk/kubernetes-nodejs-helloworld:latest .

#To build the test container
docker build --rm -t tlitovsk/jenkins-jnlp:latest .

kubectl proxy
https://127.0.0.1:8001/k8s/clusters/c-swqn4/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
