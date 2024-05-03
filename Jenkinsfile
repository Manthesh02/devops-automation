pipeline {
    agent any

    parameters {
        string(defaultValue: '1.0.0', description: 'Version number for the build', name: 'VERSION')
    }

    environment {
        GIT_USER_EMAIL = 'vmanthesh20@gmail.com'
        GIT_USER = 'Manthesh02'
    }

    tools {
        maven 'Maven' // Use the Maven tool defined in Jenkins
    }

    stages {
        stage('Git Configuration') {
            steps {
                sh "git config --global user.email '${env.GIT_USER_EMAIL}'"
                sh "git config --global user.name '${env.GIT_USER}'"
            }
        }

        stage('Checkout') {
            steps {
                // Checkout the main branch of the GitHub repository using SSH
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'd5a98037-9aae-4de5-a2a9-6e102c36aab7', url: 'git@github.com:Manthesh02/Publish.git']])
            }
        }

        stage('Maven Build') {
            steps {
                // Run Maven clean and install
                sh 'mvn clean install'
            }
        }

        stage('Tag and Push') {
            steps {
                // Tag the commit with the specified version number
                sh "git tag -a ${params.VERSION} -m 'Version ${params.VERSION}'"

                // Push the tag to the remote repository
                sh 'git push origin --tags'
            }
        }

        stage('Build Node JS Docker Image') {
            steps {
                script {
                    sh 'docker build -t manthesh/java-app-1.0 .'
                }
            }
        }

        stage('Deploy Docker Image to DockerHub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhub')]) {
                        sh 'docker login -u manthesh -p ${dockerhub}'
                        sh 'docker push manthesh/java-app-1.0'
                    }
                }
            }
        }

        // Added 'Deploy to Minikube' stage
        stage('Deploy to Minikube') {
            steps {
                script {
                    // Load kubeconfig as a file credential
                    withCredentials([file(credentialsId: 'Kubeconfig', variable: 'config')]) {
                        // Ensure that the 'app.yaml' file is present in your repository or Jenkins workspace 
                        sh 'kubectl --kubeconfig=$config apply -f app.yaml'
                    }
                }
            }
        }
    }
}
