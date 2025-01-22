import Constants from "expo-constants";
import * as Updates from "expo-updates";

export type Environment = "development" | "preview" | "production";

interface EnvironmentConfig {
  apiUrl: string | undefined;
  environment: Environment;
}

// Add values for your environment here
const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    apiUrl: process.env.EXPO_PUBLIC_DEVELOPMENT_BASE_URL,
    environment: "development",
  },
  preview: {
    apiUrl: process.env.EXPO_PUBLIC_PREVIEW_BASE_URL,
    environment: "preview",
  },
  production: {
    apiUrl: process.env.EXPO_PUBLIC_PRODUCTION_BASE_URL,
    environment: "production",
  },
};

let currentEnvironment: Environment = "development";

if (__DEV__) {
  currentEnvironment = "development";
} else if (Updates.channel === "preview") {
  currentEnvironment = "preview";
} else if (Updates.channel === "production") {
  currentEnvironment = "production";
}

// Fallback to using Constants if Updates.channel is not set
if (!Updates.channel && Constants.expoConfig?.extra?.environment) {
  currentEnvironment = Constants.expoConfig.extra.environment as Environment;
}

export const environment: EnvironmentConfig = environments[currentEnvironment];
