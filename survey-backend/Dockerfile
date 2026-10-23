
FROM tomcat:9.0-jdk17-temurin

# Remove Tomcat's default web applications
RUN rm -rf /usr/local/tomcat/webapps/*

# Create the web application directories
RUN mkdir -p /usr/local/tomcat/webapps/api/WEB-INF/classes

# Copy web.xml and dependency JARs from their actual locations
COPY src/config/web.xml /usr/local/tomcat/webapps/api/WEB-INF/web.xml
COPY src/lib/ /usr/local/tomcat/webapps/api/WEB-INF/lib/

# Copy Java source files into the container
COPY src/ /tmp/survey-src/

# Compile the Java source files
RUN find /tmp/survey-src -type f -name "*.java" > /tmp/sources.txt \
    && javac \
       -cp "/usr/local/tomcat/lib/servlet-api.jar:/usr/local/tomcat/webapps/api/WEB-INF/lib/*" \
       -d /usr/local/tomcat/webapps/api/WEB-INF/classes \
       @/tmp/sources.txt \
    && rm -rf /tmp/survey-src /tmp/sources.txt

EXPOSE 8080

# Run Tomcat in the foreground
CMD ["catalina.sh", "run"]
