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
    }
    catch (err) {

        currentBuild.result = "FAILURE"
        throw err
    }

}