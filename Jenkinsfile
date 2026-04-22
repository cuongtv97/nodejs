pipeline {
  agent {
    kubernetes {
      cloud 'nodejs-cicd'
      yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command:
    - sh
    args:
    - -c
    - sleep 999999
    tty: true
"""
    }
  }

  environment {
    IMAGE = "ghcr.io/cuongtv97/nodejs"
    TAG = "${BUILD_NUMBER}"
  }

  stages {

    stage('Checkout') {
      steps {
        git 'https://github.com/cuongtv97/nodejs.git'
      }
    }

    stage('Build & Push Image') {
      steps {
        container('kaniko') {
          sh """
          /kaniko/executor \
            --context ${WORKSPACE} \
            --dockerfile ${WORKSPACE}/Dockerfile \
            --destination ${IMAGE}:${TAG} \
            --destination ${IMAGE}:latest \
            --skip-tls-verify
          """
        }
      }
    }

    stage('Deploy') {
      steps {
        sh """
        kubectl set image deployment/nodejs-app \
        nodejs=${IMAGE}:${TAG} -n jenkins
        """
      }
    }
  }
}
