## Usecases

- You just want to spin up a simple proxy on your vps to change ip or test something.
- For some reason you want to create a chain of proxies.
- You've purchased several proxies from a store and wish to access them all using a single URL. Setting up a custom DNS might be too complicated or inconvenient for your setup. This repository enables the underlying remote proxy to be configured externally to your main application by making API requests here to set or rotate your addresses.
- Idk suggest :)

**This repo is more of a POC than prod-ready solution. If, by any chance, you inspect the codebase and have expertise on the topic, I'd be grateful to receive any advice!**

__Plain js just because, no reason, I like ts more__ 

## Setup

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

## Usage

At this point you have a local proxy address and api address to control chaining.

### Proxy usage

Put your `API_HOST:API_PORT` as proxy param to request
```sh
curl -x http://127.0.0.1:8000 https://json.myip.wtf
```

### Api for dynamic remote proxy chaining control

```sh
# set
curl -X POST 127.0.0.1:6666/api/set-remote-proxy -d '127.0.0.1:1337' # {"data":"OK"}
curl -X POST 127.0.0.1:6666/api/set-remote-proxy -d 'log:pass@127.0.0.1:1337' # {"data":"OK"}

# get
curl 127.0.0.1:6666/api/get-remote-proxy # {"data":"log:pass@127.0.0.1:1337"}

# reset (disable chaining)
curl -X POST 127.0.0.1:6666/api/set-remote-proxy -d '' # {"data":"OK"}
```

