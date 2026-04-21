pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    command: ['cat']
    tty: true
"""
    }
  }

  environment {
    IMAGE = "ghcr.io/cuongtv97/nodejs"
    TAG = "${BUILD_NUMBER}"
  }

  stages {

    stage('Build') {
      steps {
        container('kaniko') {
          sh '''
          /kaniko/executor \
            --context $WORKSPACE \
            --dockerfile Dockerfile \
            --destination $IMAGE:$TAG \
            --destination $IMAGE:latest
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        sh '''
        kubectl set image deployment/nodejs-app \
        nodejs=$IMAGE:$TAG -n jenkins
        '''
      }
    }
  }
}
