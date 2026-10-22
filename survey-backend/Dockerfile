
FROM tomcat:9.0-jdk17-temurin

# Remove Tomcat's default applications
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the servlet configuration and dependency libraries
COPY config/web.xml /usr/local/tomcat/webapps/api/WEB-INF/web.xml
COPY lib/ /usr/local/tomcat/webapps/api/WEB-INF/lib/

# Copy Java source code into the build environment
COPY src/ /tmp/survey-src/

# Compile the Java source files
RUN mkdir -p /usr/local/tomcat/webapps/api/WEB-INF/classes \
    && find /tmp/survey-src -type f -name "*.java" > /tmp/sources.txt \
    && javac \
       -cp "/usr/local/tomcat/lib/servlet-api.jar:/usr/local/tomcat/webapps/api/WEB-INF/lib/*" \
       -d /usr/local/tomcat/webapps/api/WEB-INF/classes \
       @/tmp/sources.txt \
    && rm -rf /tmp/survey-src /tmp/sources.txt

# Start Tomcat in the foreground
CMD ["catalina.sh", "run"]
