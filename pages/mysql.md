# MySQL

* [MySQL 内核月报](http://mysql.taobao.org/monthly/)

```bash
docker run -p 3306:3306 --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d mysql
docker exec -it mysql mysql
docker stop mysql && docker rm mysql
```
