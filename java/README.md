We had a one off project were we needed to serve up this angular app
as a war file, with a very basic API endpoint that would accept an
email and send it off to a third party.

This provides the code and tools for building a war file that includes
that API endpoint, and make the whole mess deployable as a single war
file.

# Building the war file

This bash script will generate a new war file, by building the angular application,
and then copying the files into correct file structure for wars, pulling in the
compiled classes, and making a zip file named mentorhub.war
```
./make_war.sh
```

# Test War

To test the war file, you can use the docker container to spin up an instance of
Tomcat, with the war file deployed inside of it.  After running this command
you should be able to visit http://localhost:8081 to view the running app.
```
./test_war.sh
````

# Deploying the war file.

This is a little more combursom due to security constraints, but you should be
able to copy this file to the web server, then drop it into the war directory
for the running tomcat instance and it will deploy or redeploy.