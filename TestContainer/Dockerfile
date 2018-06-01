FROM jenkins/jnlp-slave:latest
ARG DEBIAN_FRONTEND=noninteractive

USER root

RUN apt-get update && apt-get install --no-install-recommends -y curl dirmngr gnupg apt-transport-https ca-certificates
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -\
 && echo 'deb https://deb.nodesource.com/node_8.x stretch main' > /etc/apt/sources.list.d/nodesource.list\
 && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
 && echo 'deb https://download.docker.com/linux/debian stretch stable' > /etc/apt/sources.list.d/docker.list \
 && curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - \
 && echo 'deb http://apt.kubernetes.io/ kubernetes-xenial main' > /etc/apt/sources.list.d/kubernetes.list  \
 && apt-get update\
 && apt-get install -y nodejs docker-ce kubectl && apt-get clean && rm -rf /var/lib/apt/lists/*
 
RUN npm install -g dockerlint

USER jenkins

ENTRYPOINT ["jenkins-slave"]
#docker build --rm -t tlitovsk/jenkins-jnlp:latest .