## Getting Started

Create a new project by running:

```bash
bun create expo-app --template with-envs
```

## Setup

1. Create a new EAS project at [Expo](https://expo.dev), and copy the project ID from your project settings.
2. Configure environment variables in your EAS project:
   - Set `APP_ENV` to `development`, `preview`, or `production` based on the environment.
   - Add any additional required environment variables. Check `utils/environment.ts` for the full list.
3. Update the following constants in `app.config.ts`:
   - Set `EAS_PROJECT_ID` to your Expo project ID.
   - Set `PROJECT_SLUG` to your project slug.
   - Set `OWNER` to your Expo account name.
4. Customize the app configuration in `app.config.ts`:
   - Update the app name, package names, and bundle identifiers.
   - Configure icons and schemes for each environment.
5. Update `environment.ts` to map all the variables you added in EAS for each environment.
6. Add `/android` and `/ios` to your `.gitignore`.

## Development Setup

1. Pull your development environment variables by running:

```bash
eas env:pull development
```

This will generate a `.env.local` file with the development environment variables.

2. Set up your development build using one of these options:

   Option A: Create a development build with EAS:

   ```bash
   eas build -p ios --profile development
   ```

   Option B: Prebuild locally:

   ```bash
   npx expo prebuild
   ```

3. Run the app:

```bash
npx expo run:ios
```

## Development Workflow

The recommended workflow is to use a development client during development. When your changes are ready for testing:

1. Create a preview build:

```bash
eas build -p ios --profile preview
```

2. Share the preview with your team or client. You can update this build remotely by running:

```bash
eas update -p ios --environment preview --channel preview
```

Note: The same update process applies for production and development builds.

3. For production releases:
   - Build only: `eas build -p ios`
   - Build and submit: `eas build -p ios --auto-submit`

## Switching Environments

1. Pull the desired environment variables (e.g., "preview"):

```bash
eas env:pull preview
```

This will update the `.env.local` file with the preview environment variables.

2. Prebuild the app:

```bash
npx expo prebuild
```

3. Run the app:

```bash
npx expo run:ios
```
