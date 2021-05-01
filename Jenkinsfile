pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-v /usr/share/jenkins/cache:/build_cache'
        }
    }

    environment {
        YARN_CACHE_FOLDER='/build_cache/yarn'
    }

    stages {
        stage('Build') {
            steps {
                sh 'yarn'
                sh 'yarn build'
            }
            post {
                success {
                    zip zipFile: 'rustic-web-client.zip', archive: true, dir: 'dist'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
