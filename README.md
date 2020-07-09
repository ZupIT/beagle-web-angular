# [Beagle Angular](https://docs.usebeagle.io/v/v1.0-en/get-started/installing-beagle/web#angular)
Beagle Angular is a Zup's open source library for using [Beagle](https://docs.usebeagle.io/v/v1.0-en/) in an [Angular](https://angular.io/) based project.

# Getting started

## Installing Beagle's library

To follow the installation process, navigate to the root of your angular project and run one of the commands below according to the package manager of your preference. 

If you use Yarn:

```
yarn add @zup-it/beagle-angular
```

If you use npm:

```
npm install --save @zup-it/beagle-angular
```

## Verifying the installation

To confirm if the process worked, you simply have to use one of the commands below:

```
yarn beagle help
```

```
npx beagle help
```

If the Beagle's commands were listed, that means that the installation correctly worked.

```Well done! Your library was installed. Now, you can see more of how to use Beagle on Angular.```

## Usage configurations

After you finished the installation, you need to make **Beagle's usage configuration for Angular's framework**. To do so, you just have to follow these steps:

### Step 1: Automatic Configuration

Type one of the commands below to generate the files that will be used on Beagle's library. It's possible to execute the command according to your package manager: 

```
yarn beagle init
```

```
npx beagle init
```

Once you made it, Beagle will return some questions. To answer them, follow the orientations below: 

#### Question 1: Would you like to use yarn or npm? 
In this case, type the option that will be used as manager. In our example, we will use `yarn`, so type `yarn` and press enter. 

#### Question 2: Path to the beagle module (press enter to use default) 
In this case, type the module path that will be used for Beagle. Considering we're creating this project from zero e and there is no module, you just have to press enter without informing anything.

#### Question 3: Path to the module with the components to use with beagle (press enter to use default)
In this case, type the module path that will be used for Beagle's components. Considering we don't have any module yet, you just have to press enter without informing anything. 

#### Question 4:  What's the base url of the backend providing your beagle JSONs? (press enter to use default)
In this case, type the backend's basis URL that will be used to rescue JSON files. For our example, we'll use a JSON, so just type: `http://localhost:4200/assets`

At the end of this process, two files will be generate on your project: 

- **beagle-components.module.ts**
- **beagle.module.ts**

Open the file `app.module.ts` and, then, import Beagle's module that was just generated:

```
...
import { Beagle } from './beagle.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Beagle
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

[Manual configuration](/docs/manual_configuration.md)

### Step 2: JSON creation to be rendered

Now, you just have to create a JSON to render the components. Usually, this process would be made by an external server that would return de JSON, but for this example we'll create a local file to be accessed for the test.

On your angular project, navigate to the `src/assets` file and create a new file named `payload.json`. Open this new file you just created and copy the content below:

```json
{
    "_beagleComponent_": "beagle:container",
    "children": [
        {
            "_beagleComponent_":"beagle:text",
            "text":"Hello Beagle"
        },
       {
            "_beagleComponent_":"beagle:text",
            "style":{
              "padding":{
                "top":{
                  "value":10,
                  "type": "REAL"
                }
              }
            },
            "text":"Beagle is a cross-platform framework which provices usage of the server Driven UI concept,natively in iOS, Android and Web applications. By using Beagle, your team could easily change application's layout and data by just changing backend code"
        }
    ]
}
```

```
The Beagle's library comes with many pre-defined components ready to be used in their project. 
The code above creates a JSON with two os these components: container e text.
```

After you created your JSON, open the file `beagle.module.ts` we generated in the previous step and add as a baseUrl the path: http://localhost:4200/assets

```
import { BeagleModule } from '@zup-it/beagle-angular'
// import all the components you wish to use with Beagle.

@BeagleModule({
  baseUrl: 'http://localhost:4200/assets',
  module: {
    path: './beagle-components.module',
    name: 'BeagleComponentsModule',
  },
  components: {
    // Associate every beagle component to your angular component.
  },
})
export class Beagle {}
```

Well done, your configuration is ready! Now, we'll see how to render mapped components on JSON.


### Step 3: Using beagle-remote-view

After created the JSON, you need to add a local, inside the application, where the components will be rendered. To make this action, the Beagle's library provides the component `<beagle-remote-view>`.

Open the file `app.component.html` and replace all the content with this code:

`<beagle-remote-view [loadParams]="loadParams"></beagle-remote-view>`

Notice that the component above needs to receive a `loadParams` mandatory propriety and that's what we'll create now.

Open the file `app.component.ts` and import LoadParams as the following example:

`import { LoadParams } from '@zup-it/beagle-web';`

Once you made it, state the variable that will be used on the template:

```
loadParams: LoadParams;

constructor() {
  this.loadParams = {
    path: '/payload.json'
  };
}
```

```Notice that, in this path, we use the/payload.json value that will be associated to the baseUrl from the previous step to create a path to access our JSON files.```

At the end of this process, the content of your app.component.ts file must be similar to this code below:

```
import { Component } from '@angular/core';
import { LoadParams } from '@zup-it/beagle-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'beagle-web-app';

  loadParams: LoadParams;

  constructor() {
    this.loadParams = {
      path: '/payload.json'
    };
  }
}
```

### Testing the application

Before we test if our configuration worked, you have to run one of the commands below to initialize the application: 

If you use npm:

`npm run serve`

If you use yarn: 

`yarn serve`


```
Its important to clarify here that the command used to restart the application is fundamental make work the changes you intend to make in Beagle's configurations files.
This process also must be done for any change made on @Input() properties of your mapped components. Beagle's team is constantly developing solutions to improve this.
```

After finished this commands, access the local: `http://localhost:4200`
You should see the screen with the text present in the text attribute in the json above

`Well done, you created your first screen with Beagle!`

# License
Beagle Angular is Apache licensed .
<!--[Apache licensed](https://github.com/ZupIT/beagle-web-react/blob/master/LICENSE)-->
