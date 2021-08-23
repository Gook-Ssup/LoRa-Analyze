# DB

### MongoDB Docker Image 다운로드  

```bash
docker pull mongo
```

### Docker Image 확인  

```bash
docker images
```

### Docker 컨테이너 생성 & 실행  

```bash
docker run --name [container-name] -d -p 27018:27017 mongo
```

* 프로젝트에서 port와 맞춰주기

### Docker Container 리스트 확인

```bash
docker ps -a
```

### Docker Container start/stop/restart

```bash
docker start [container-name]
docker stop [container-name]
docker restart [container-name]
```

### Docker Container 접속

```bash
docker exec -it [container-name] bash
```