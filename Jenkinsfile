pipeline {
  agent {
    kubernetes {
      cloud 'nodejs-cicd'   // 👈 TÊN CLOUD bạn đã tạo
      yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    command:
    - cat
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
