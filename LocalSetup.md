## Redis Setup

---

- `docker volume create redis-data` *create volume*
- `docker run -d --name redis -v redis-data:/data -v $(pwd)/redis.conf:/usr/local/etc/redis/redis.conf -p 6379:6379 redis:latest`
  *run redis image*
- `docker exec -it redis redis-cli` *go inside redis-cli from image*
- `ACL SETUSER $username on >$password ~* +@all` *create new user*
- `ACL SETUSER default off` *turn off default user permissions*