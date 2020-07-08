# Manual configuration

The recommended way of configuring beagle for Angular is using `beagle init`. Still if, for some reason, you can't use `beagle init`, you can follow the steps below to manually set
Beagle up.

1. create the file `beagle-components.module.ts` under `src/app` with the `@NgModule` containing all
the components you wish to use with Beagle.

2. create the file `beagle.module.ts` under `src/app` with your `@BeagleModule` containing all the
configuration for Beagle.

3. Install `ts-node` and `amd-loader` as dev dependencies: `yarn add -D ts-node amd-loader` or
`npm install -D ts-node amd-loader`.

4. Create the scripts `serve` and `build` in your `package.json`:
```json
scripts: {
  "serve": "yarn beagle view-engine && ng build --prod",
  "build": "yarn beagle view-engine && ng serve"
}
```
If you're using npm:
```json
scripts: {
  "serve": "npx beagle view-engine --npm && ng build --prod",
  "build": "npx beagle view-engine --npm && ng serve"
}
```

5. In your `angular.json` file, create the following entries in your project's configuration:
```json
"architect": {
  "options": {
    "fileReplacements": [
      {
        "replace": "src/app/beagle.module.ts",
        "with": "src/app/.beagle.module.generated.ts"
      }
    ]
  },
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/app/beagle.module.ts",
          "with": "src/app/.beagle.module.generated.ts"
        }
      ]
    }
  }
}
```

6. Add `src/app/.beagle.module.generated.ts` and `src/app/.beagle.module.original.ts` to your
`.gitignore`

7. Done! You should always use `yarn serve/build` or `npm run serve/build` instead of
`ng serve/build`.
	