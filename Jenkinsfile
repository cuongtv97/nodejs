pipeline {
  agent any

  environment {
    IMAGE = "ghcr.io/cuongtv97/nodejs"
    TAG = "${BUILD_NUMBER}"
  }

  stages {

    stage('Build & Push (Kaniko)') {
      steps {
        sh '''
        /kaniko/executor \
          --context $WORKSPACE \
          --dockerfile $WORKSPACE/Dockerfile \
          --destination $IMAGE:$TAG \
          --skip-tls-verify
        '''
      }
    }

    stage('Deploy') {
      steps {
        sh '''
        sed -i "s|image: .*|image: $IMAGE:$TAG|" k8s/deployment.yaml
        kubectl apply -f k8s/deployment.yaml
        '''
      }
    }
  }
}
