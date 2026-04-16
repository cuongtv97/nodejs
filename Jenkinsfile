pipeline {
  agent any

  environment {
    IMAGE = "cuongtv97/nodejs"
    TAG = "${BUILD_NUMBER}"
  }

  stages {

    stage('Build Image') {
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
