# Getting started

## TL;DR

```
yarn add @zup-it/beagle-angular
yarn beagle init
```

After running the init process, edit the files `src/app/beagle.module.ts` and
`src/app/beagle-components.module.ts` with your content.

## Installation

Install `beagle-angular` with the following command:

```
yarn add @zup-it/beagle-angular
```

Or

```
npm install --save @zup-it/beagle-angular
```

## Automatic configuration

Now that you have installed the library, you can run the `init` command to initialize your
application using Beagle.

```
yarn beagle init
```

Or

```
npx beagle init
```

First, it will ask you if you prefer using "npm" or "yarn". Type whatever manager you are currently
using.

If you already know the URL to your Beagle backend, type it when asked for. For every other
question, unless you want specify custom names for your files, type enter to use the default values.

```
Would you like to use yarn or npm? yarn
Path to the beagle module (press enter to use default):
Path to the module with the components to use with beagle (press enter to use default):
What's the base url of the backend providing your beagle JSONs? (press enter to use default): https://mybeagle.com
```

After running `beagle init`, you'll notice that two files have been created under `src/app`, they
are:
- `beagle.module.ts`: definitions for the beagle-angular library: url to retrieve the views,
components, etc.
- `beagle-components.module.ts`: module with everything you need to render with Beagle. In this
module, you should declare or import the components you will use for the server driven ui.

The code for beagle-angular is compiled. For this reason, you should let the beagle compiler run
before serving or building your application. `beagle init` already did all the configuration for
you. You just need to remember to run `yarn serve` and `yarn build` (`npm run serve` and
`npm run build` if you're using npm) instead of `ng serve` and `ng build`. By running the yarn/npm
scripts instead of the ng scripts, you ensure the compilation needed by beagle will be done before
the angular compilation.

## Manual configuration

If, for some reason, you can't use `beagle init`, you can follow the steps below to manually set
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
