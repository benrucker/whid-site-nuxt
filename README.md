# whid-site-nuxt

A site built in Nuxt for fun!

## Installation & Usage

```bash
npm install --force # The "force" is needed because Nuxt 2 is not compatible with current tooling
npm run dev
```

## Running in Production

```bash
npm run build
npm run start
```

## Deploying

> These instructions are only for this fork of the repo

All new commits to `develop` will automatically deploy to the testing URL.

New production releases can be deployed by creating a new semver tag. One way to do this is through the GitHub Releases tab, but a locally created and pushed semver tag will work too. Once the tag is created, GCP will notice the change and deploy the new version to the production URL.

## Advanced instructions

The default README from the project generation script can be found [here](./README_OLD.md).
