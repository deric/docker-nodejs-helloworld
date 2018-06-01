node('k8s-slave') {
    currentBuild.result = "SUCCESS"
    try {
       shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()

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
                def hello_image = docker.build("tlitovsk/kubernetes-nodejs-helloworld:${shortCommit}")
                if (env.BRANCH_NAME == 'master') {
                    hello_image.push()
                }
            }
       }
       stage('Deploy')
       {
           sh 'kubectl'
       }
    }
    catch (err) {

        currentBuild.result = "FAILURE"
        throw err
    }

}