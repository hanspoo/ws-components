docker build -t localhost:32000/archimail/1.0:latest .
docker push localhost:32000/archimail/1.0:latest
microk8s kubectl delete pods -l app=archimail
