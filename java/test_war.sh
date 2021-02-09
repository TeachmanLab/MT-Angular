docker image build -t mentorhub ./
docker container run -it --publish 8081:8080 mentorhub
