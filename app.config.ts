import { ConfigContext, ExpoConfig } from "expo/config";

// Change this to your EAS project ID
// Get it from https://expo.dev/accounts/[account]/projects/[project]
const EAS_PROJECT_ID = "4a40e811-db03-4dfb-bc1d-c97b8edc5a78";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: "with-envs",
    slug: "with-envs",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: getDynamicAppConfig(process.env.APP_ENV)
        .bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: getDynamicAppConfig(process.env.APP_ENV).package,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
      environment: process.env.APP_ENV || "development",
    },
  };
};

export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "development") {
    return {
      bundleIdentifier: "com.beto.app.dev",
      package: "com.beto.app.dev",
    };
  }

  if (environment === "preview") {
    return {
      bundleIdentifier: "com.beto.app.preview",
      package: "com.beto.app.preview",
    };
  }

  return {
    bundleIdentifier: "com.beto.app.prod",
    package: "com.beto.app.prod",
  };
};
