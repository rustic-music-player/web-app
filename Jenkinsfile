pipeline {
    agent {
        docker 'node:latest'
    }

    stages {
        stage('Test') {
            steps {
                sh 'yarn'
                sh 'yarn build'
            }
            post {
                always {
                    zip zipFile: 'rustic-web-client.zip', archive: true, dir: 'dist'
                }
            }
        }
    }
}
