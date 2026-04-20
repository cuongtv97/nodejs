pipeline {
  agent any

  environment {
    IMAGE = "ghcr.io/cuongtv97/nodejs"
    TAG = "${BUILD_NUMBER}"
    GITHUB_USER = "cuongtv97"
    GITHUB_TOKEN = "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"
  }

  stages {

    stage('Login GHCR') {
      steps {
        sh '''
        echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USER --password-stdin
        '''
      }
    }

    stage('Build & Push Image') {
      steps {
        sh '''
        docker build -t $IMAGE:$TAG .
        docker push $IMAGE:$TAG
        '''
      }
    }

    stage('Deploy K8s') {
      steps {
        sh '''
        sed -i "s|image: .*|image: $IMAGE:$TAG|" k8s/deployment.yaml
        kubectl apply -f k8s/deployment.yaml
        '''
      }
    }
  }
}
