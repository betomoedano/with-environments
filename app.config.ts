import { ConfigContext, ExpoConfig } from "expo/config";

// Change this to your EAS project ID
// Get it from https://expo.dev/accounts/[account]/projects/[project]
const EAS_PROJECT_ID = "4a40e811-db03-4dfb-bc1d-c97b8edc5a78";

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(process.env.APP_ENV);

  return {
    ...config,
    name: name,
    slug: "with-envs",
    version: "1.0.0",
    orientation: "portrait",
    icon: icon,
    scheme: scheme,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff",
      },
      package: packageName,
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
      name: "App Dev",
      bundleIdentifier: "com.beto.app.dev",
      packageName: "com.beto.app.dev",
      icon: "./assets/images/icons/iOS-Dev.png",
      adaptiveIcon: "./assets/images/icons/Android-Dev.png",
      scheme: "myapp-dev",
    };
  }

  if (environment === "preview") {
    return {
      name: "App Preview",
      bundleIdentifier: "com.beto.app.preview",
      packageName: "com.beto.app.preview",
      icon: "./assets/images/icons/iOS-Prev.png",
      adaptiveIcon: "./assets/images/icons/Android-Prev.png",
      scheme: "myapp-prev",
    };
  }

  return {
    name: "App Prod",
    bundleIdentifier: "com.beto.app.prod",
    packageName: "com.beto.app.prod",
    icon: "./assets/images/icons/iOS-Prod.png",
    adaptiveIcon: "./assets/images/icons/Android-Prod.png",
    scheme: "myapp-prod",
  };
};
