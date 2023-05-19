declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_SMTP_SERVER: string;
      NODE_ENV: "development" | "production" | "test";
      VITE_SMTP_PASS: string;
      VITE_SMTP_PORT: string;
      VITE_SMTP_USER: string;
      USAR_COD_CENCO: string;
    }
  }
}

export {};
