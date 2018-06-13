def namespace = "example-hello-world"
def label = "mypod-${UUID.randomUUID().toString()}"
podTemplate(label: label, serviceAccount: "jenkins", cloud: "example", yaml: """
apiVersion: v1 
kind: Pod 
metadata: 
    name: jenkins-slave-nodejs 
spec: 
    containers: 
      - name: jnlp 
        image: tlitovsk/jenkins-jnlp:latest
        imagePullPolicy: Always
        env: 
          - name: DOCKER_HOST 
            value: tcp://localhost:2375 
      - name: dind-daemon 
        image: docker:18-dind 
        resources: 
            requests: 
                cpu: 20m 
                memory: 512Mi 
        securityContext: 
            privileged: true 
        volumeMounts: 
          - name: docker-graph-storage 
            mountPath: /var/lib/docker 
    volumes: 
      - name: docker-graph-storage 
        emptyDir: {}
"""
)
{
    node(label) {
        try {
            stage('Checkout'){
                checkout scm
            }

            stage('Lint Dockerfiles')
            {
                sh 'dockerlint Dockerfile'
                sh 'dockerlint TestContainer/Dockerfile'
            }
            stage('Test'){
                env.NODE_ENV = "test"
                print "Environment will be : ${env.NODE_ENV}"
                sh 'node -v'
                sh 'npm install'
                sh 'npm test'
                junit('junit.xml')
            }
            if (env.BRANCH_NAME != 'master') {
                stage ('SonarQube analysis')
                {
                    withSonarQubeEnv('QubeR') {
                    // requires SonarQube Scanner for Maven 3.2+
                        sh '/usr/lib/node_modules/sonarqube-scanner/dist/bin/sonar-scanner'
                    }
                }
            }
            stage('Build'){
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub'){
                        shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
                        def hello_image = docker.build("tlitovsk/kubernetes-nodejs-helloworld:${shortCommit}")
                        currentBuild.result = "SUCCESS"
                        hello_image.push()
                    }
            }
            if (env.BRANCH_NAME != 'master') {
                stage('Integration tests'){
                        shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
                        testNamespace = "${namespace}-${shortCommit}-${BUILD_NUMBER}"
                        sh "kubectl get deployments --namespace=${testNamespace}"
                        sh "cd deployment \
                            && sed -i s/ver1/${shortCommit}/ hello-2.yaml \
                            && kubectl delete ns ${testNamespace} || true \
                            && kubectl create ns ${testNamespace}\
                            && kubectl create -f hello-3-service.yaml --namespace=${testNamespace}\
                            && kubectl create -f hello-2.yaml --namespace=${testNamespace}"
                        sh "sleep 3"
                        sh "kubectl rollout status deployment/hello-deployment --namespace=${testNamespace}"
                        sh "curl http://hello-service.${testNamespace}.svc.cluster.local:8080"
                        sh "curl http://hello-service.${testNamespace}.svc.cluster.local:8080/world"
                        sh "curl http://hello-service.${testNamespace}.svc.cluster.local:8080/vodafone"                        //
                        sh "kubectl delete ns ${testNamespace}"

                }
            }else{
                stage('Deploy')
                {
                    shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
                    sh "kubectl get deployments --namespace=${namespace}"
                    sh "cd deployment \
                        && sed -i s/ver1/${shortCommit}/ hello-2.yaml \
                        && kubectl apply -f hello-2.yaml --namespace=${namespace}"
                    sh "kubectl rollout status deployment/hello-deployment --namespace=${namespace}"
                    
                }
                stage('Verify')
                {
                    sh "curl https://test.devtrails.co.nz/hello"
                }
            }
        }
        catch (err) {
            currentBuild.result = "FAILURE"
            shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
            testNamespace = "${namespace}-${shortCommit}-${BUILD_NUMBER}"
            sh 'kubectl delete ns ${testNamespace} || true'
            throw err
        }

    }
}