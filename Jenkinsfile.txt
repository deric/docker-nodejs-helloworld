node('master') {


    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
       

       }

       stage('Build Docker'){

          
       }

       stage('Deploy'){

        
       }

       stage('Cleanup'){    
        
       }


    }
    catch (err) {

        currentBuild.result = "FAILURE"
        throw err
    }

}