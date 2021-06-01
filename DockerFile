FROM registry.apps.dev.openshift.ised-isde.canada.ca/ised-ci/openjdk18-openshift:latest

COPY target/cbmds*.jar /ROOT.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/ROOT.jar"]