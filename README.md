## Getting Started

Create a new project by running:

```bash
bun create expo-app --template with-envs
```

## Setup

1. Create a new EAS project at [Expo](https://expo.dev), and copy the project ID from your project settings.
   <img width="951" alt="Screenshot 2025-01-22 at 3 54 27 PM" src="https://github.com/user-attachments/assets/35fb62be-dee0-4ee8-acb1-0fd85ef82ceb" />

2. Configure environment variables in your EAS project:

- Set `APP_ENV` to `development`, `preview`, or `production` based on the environment.
- Set three `EXPO_PUBLIC_API_URL` based on the environment. (Add more envs if you need)
- Add any additional required environment variables. Check `utils/environment.ts` for the full list.
  ![image](https://github.com/user-attachments/assets/13edbebc-c2a3-49d4-aa90-c5d4d5d105ae)

3. Update the following constants in `app.config.ts`:
   - Set `EAS_PROJECT_ID` to your Expo project ID.
   - Set `PROJECT_SLUG` to your project slug.
   - Set `OWNER` to your Expo account name.

You can find these values in your project details:
<img width="947" alt="Screenshot 2025-01-22 at 3 56 05 PM" src="https://github.com/user-attachments/assets/e8e17cef-8cbb-4d25-b09a-d861d08b6b2c" />

4. Customize the app configuration in `app.config.ts`:
   - Update the app name, package names, and bundle identifiers.
   - Configure icons and schemes for each environment.
5. Add `/android` and `/ios` to your `.gitignore`.

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

Don't forget to pass the `--environment` flag when sending an update, this will ensure the update uses the correct env variables

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
