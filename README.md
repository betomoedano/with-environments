## How to use

- Create a new EAS Project at expo.dev and copy the project ID
- Add env variables (dev, prev, prod)
- Set your project id on `app.config.ts`
- Update `app.config.ts` to match your app config
- Update `environment.ts` to match your app environment

# How to run in Dev

- `eas env:pull development`
- `bun prebuild:dev`
- `bun run:ios:dev`

## How to run in Preview

- `eas env:pull preview`
- `bun prebuild:preview`
- `bun run:ios:preview`

## How to run in Prod

- `eas env:pull production`
- `bun prebuild:prod`
- `bun run:ios:prod`
