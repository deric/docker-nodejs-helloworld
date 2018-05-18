# Kubernetes node.js example app

To build a container:
docker build -t <name> .

docker push tlitovsk/docker-nodejs-helloworld:latest
kubectl.exe run  --image tlitovsk/docker-nodejs-helloworld:latest test
kubectl delete deployment test