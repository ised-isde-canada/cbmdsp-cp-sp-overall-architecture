FROM ised-ci/openjdk18-openshift:latest

COPY target/ROOT.jar /ROOT.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/ROOT.jar"]