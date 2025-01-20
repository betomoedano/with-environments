type Environment = "development" | "preview" | "production";

interface EnvironmentConfig {
  apiUrl: string;
}

const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    apiUrl: "http://localhost.api",
  },
  preview: {
    apiUrl: "https://preview.api",
  },
  production: {
    apiUrl: "https://production.api",
  },
};

export const environment = environments[process.env.APP_ENV as Environment];
