# Kubernetes node.js example app

To build a container:
docker build -t tlitovsk/kubernetes-nodejs-helloworld:latest .

docker push tlitovsk/kubernetes-nodejs-helloworld:latest
kubectl.exe run  --image tlitovsk/kubernetes-nodejs-helloworld:latest test
kubectl delete deployment test




https://159.65.132.157/k8s/clusters/c-swqn4/api/v1/namespaces/example/services/hello-service:8080/proxy/

kubectl proxy
https://127.0.0.1:8001/k8s/clusters/c-swqn4/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

https://128.199.223.176/hello