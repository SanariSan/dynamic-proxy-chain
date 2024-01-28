### Base

Create .env

Fill custom values
```sh
# Local proxy
PROXY_HOST=127.0.0.1
PROXY_PORT=8000

# Local api server for configuring remote (chain) proxy
API_HOST=127.0.0.1
API_PORT=6666

# Initial proxy settings
# USERNAME+PASSWORD completely optional (also local proxy auth not supported yet)
# HOST+PORT required to enable proxy chaining 
INITIAL_REMOTE_PROXY_USERNAME=
INITIAL_REMOTE_PROXY_PASSWORD=
INITIAL_REMOTE_PROXY_HOST=127.0.0.1
INITIAL_REMOTE_PROXY_PORT=8001

# Only proxy https requests
PROXY_HTTPS_ONLY=false

# Recommended for prod usage
DISABLE_LOGGING=false
```

### Api for dynamic remote proxy changing

```sh
# set
curl -X POST 127.0.0.1:6666/api/set-remote-proxy -d '127.0.0.1:1337' # {"data":"OK"}
curl -X POST 127.0.0.1:6666/api/set-remote-proxy -d 'log:pass@127.0.0.1:1337' # {"data":"OK"}

# get
curl 127.0.0.1:6666/api/get-remote-proxy # {"data":"log:pass@127.0.0.1:1337"}

# reset (disable chaining)
curl -X POST 127.0.0.1:6666/api/set-remote-proxy -d '' # {"data":"OK"}
```

### Usage

Put your `API_HOST:API_PORT` as proxy param to request
```sh
curl -x http://127.0.0.1:8000 https://json.myip.wtf
```
