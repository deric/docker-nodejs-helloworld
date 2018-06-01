def label = "mypod-${UUID.randomUUID().toString()}"
podTemplate(label: label,cloud : "example", yaml: """
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
            env:
          - name: DOCKERHUB_USERNAME
            valueFrom:
              secretKeyRef:
                name: docker-hub-access
                key: user
          - name: DOCKERHUB_PASSWORD
            valueFrom:
              secretKeyRef:
                name: docker-hub-access
                key: password
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

node(label) {
    currentBuild.result = "SUCCESS"
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

       stage('Build'){
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub'){
                shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
                def hello_image = docker.build("tlitovsk/kubernetes-nodejs-helloworld:${shortCommit}")
                if (env.BRANCH_NAME == 'master') {
                    hello_image.push()
                }
            }
       }
       stage('Deploy')
       {
           shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
           sh 'kubectl get deployments'
       }
    }
    catch (err) {

        currentBuild.result = "FAILURE"
        throw err
    }

}