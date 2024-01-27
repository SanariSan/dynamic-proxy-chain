### Base

Create .env

Fill custom values
```sh
HOST=127.0.0.1
PORT=8000
API_HOST=127.0.0.1
API_PORT=6666
# Internal usage
HTTPS_ONLY=false
DISABLE_LOGGING=false
API_PATH=./src/forward/api/
```

### Api for dynamic remote proxy changing

```sh
curl 127.0.0.1:6666/api/get-remote-proxy
curl -X POST 127.0.0.1:6666/api/set-remote-proxy -d '127.0.0.1:1337'
```