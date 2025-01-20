type Environment = "development" | "preview" | "production";

interface EnvironmentConfig {
  apiUrl: string | undefined;
}

const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    apiUrl: process.env.EXPO_PUBLIC_DEVELOPMENT_BASE_URL,
  },
  preview: {
    apiUrl: process.env.EXPO_PUBLIC_PREVIEW_BASE_URL,
  },
  production: {
    apiUrl: process.env.EXPO_PUBLIC_PRODUCTION_BASE_URL,
  },
};

const currentEnvironment =
  (process.env.APP_ENV as Environment) || "development";

if (!Object.keys(environments).includes(currentEnvironment)) {
  throw new Error(
    `Invalid environment: ${currentEnvironment}. Must be one of: ${Object.keys(
      environments
    ).join(", ")}`
  );
}

export const environment = environments[currentEnvironment];
