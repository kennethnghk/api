# api

## Run the node.js app

```sh
yarn start
```
## Run by docker-compose

```sh
docker-compose up -d
```

## Build docker image

```sh
docker build -t api:v1 .
```
## Run by Kubernetes (with Minikube)

Ref: https://kubernetes.io/docs/tutorials/hello-minikube/

Create deployment
```sh
kubectl run api --image=api:v1 --port=8080 --image-pull-policy=Never
```

Create service to expose the Pod to external
```sh
kubectl expose deployment api --type=LoadBalancer
```