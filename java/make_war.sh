# A simple script for turning this angular app into a war file, so it can
# be easily deployed within the existing infrastrcture on the Mindtrails web server.
# In this case, we also have a servlet on the backend that can accept an email, and
# send that on to Mentorhub via an api they provide.

set -e

# Compile java servlet
cd mentorhub
javac src/edu/virginia/mentorhub/EmailServlet.java -classpath ../lib/javaee-api-8.0.1.jar -d classes
cd ..

# Build angular app
cd ..
ng build --prod --build-optimizer --base-href=/
cd java

# Move files to the correct locations to create a war file structure
rm -rf war
mkdir war
cp -r ../dist/training-prototype/* war/
cp -r mentorhub/WEB-INF war
cp -r mentorhub/classes war/WEB-INF
cp application.properties war/WEB-INF/classes

# Zip up the war file for deployment.
cd war
zip -rq mentorhub.war *
mv mentorhub.war ..
cd ..

