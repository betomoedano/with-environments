## How to use

- Create a new EAS Project at expo.dev and copy the project ID
- Add env variables (dev, prev, prod)
- Set your project id on `app.config.ts`
- Run eas env:pull development
- Run eas build:configure

# How to run in Preview

- eas env:pull preview
- bun prebuild:preview
- bun run:ios:preview

# How to run in Prod

- eas env:pull production
- bun run prod
