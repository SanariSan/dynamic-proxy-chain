declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROXY_HOST: string;
      PROXY_PORT: string;
      API_HOST: string;
      API_PORT: string;
      INITIAL_REMOTE_PROXY_USERNAME: string;
      INITIAL_REMOTE_PROXY_PASSWORD: string;
      INITIAL_REMOTE_PROXY_HOST: string;
      INITIAL_REMOTE_PROXY_PORT: string;
      PROXY_HTTPS_ONLY: string;
      DISABLE_LOGGING: string;
    }
  }
}

export {};
