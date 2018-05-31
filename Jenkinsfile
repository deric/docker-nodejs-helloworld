node('k8s-slave') {
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

       }

       stage('Build'){
        //docker.withRegistry('https://registry-docker-registry.docker-registry.svc.cluster.local')
        shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
        def hello_image = docker.build("kubernetes-nodejs-helloworld:${shortCommit}-${env.BUILD_ID}")
        //hello_image.push()
       }
    }
    catch (err) {

        currentBuild.result = "FAILURE"
        throw err
    }
    post {
        always {
            junit('junit.xml')
        }
    }

}