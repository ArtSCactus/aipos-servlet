FROM openjdk:8-jdk-alpine
LABEL maintainer="artemir14@gmail.com"
VOLUME /tmp
COPY ./target/*.jar university-view.jar
CMD [ "java","-Xmx300m","-Xss512k","-XX:CICompilerCount=2","-Dfile.encoding=UTF-8","-Dspring.profiles.active=heroku","-Djava.security.egd=file:/dev/./urandom","-jar","/university-view.jar" ]