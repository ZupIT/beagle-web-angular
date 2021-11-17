# [**Beagle Angular**](https://docs.usebeagle.io/v/v1.0-en/get-started/installing-beagle/web#angular)

<a href="CONTRIBUTING.md" alt="Hacktoberfest"><img src="https://badgen.net/badge/hacktoberfest/friendly/pink" /></a>
 [![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/ZupIT/beagle-web-angular/blob/main/LICENSE)


## **Table of Contents**

### 1. [**About**](#about)
### 2. [**Usage**](#usage)
>#### 2.1. [**Installation**](#installation)
>#### 2.2. [**Configuration**](#configuration)
### 3. [**Documentation**](#documentation)
### 4. [**Contributing**](#contributing)
### 5. [**Code of Conduct**](#code-of-conduct)
### 6. [**License**](#license)
### 7. [**Community**](#community)

## **About**
Beagle Angular is a Zup's open source library to use [**Beagle**](https://docs.usebeagle.io/v/v1.0-en/) in an [**Angular**](https://angular.io/) based project.

## **Usage**

### **Installation**

To install:

1. Navigate to the root of your Angular project;
2. Run one of the commands below according to the package manager of your preference: 

If you use Yarn:

```
yarn add @zup-it/beagle-angular
```

If you use npm:

```
npm install --save @zup-it/beagle-angular
```

### **Verify your installation**

To confirm if the process worked, run one of the commands below:

```
yarn beagle help
```

```
npx beagle help
```

If the Beagle's commands were listed, that means that the installation correctly worked.

```Well done! Your library was installed. Now, you can see more of how to use Beagle on Angular.```

### **Configuration**

You need to make **Beagle's usage configuration for Angular's framework**. Follow the steps below:

#### **Step 1: Automatic configuration**

Use one of the commands below to generate the files for Beagle's library usage. It's possible to execute the command according to your package manager: 

```
yarn beagle init
```

```
npx beagle init
```

Now, Beagle will return some questions. To answer them, follow the guideline below: 

- **Question 1: Would you like to use yarn or npm?** 
In this case, type the option that will be used as manager. The example, we used `yarn`, so type `yarn` and press enter. 

- **Question 2: Path to the beagle module (press enter to use default)** 
Type the module path that will be used for Beagle. Considering we're creating this project from zero e and there is no module, you just have to press enter without informing anything.

- **Question 3: Path to the module with the components to use with beagle (press enter to use default)**
Type the module path that will be used for Beagle's components. Considering we don't have any module yet, you just have to press enter without informing anything. 

- **Question 4:  What's the base url of the backend providing your beagle JSONs? (press enter to use default)**
In this case, type the backend's basis URL that will be used to rescue JSON files. For the example, we'll use a JSON, so it will be: `http://localhost:4200/assets`.

At the end of this process, two files will be generate on your project: 

1. **beagle-components.module.ts**
2. **beagle.module.ts**

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

For more information, check out the [**Manual configuration page**](/docs/manual_configuration.md).

#### **Step 2: Create a JSON to be rendered**

You have to create a JSON to render the components. This process is usually made by an external server that would return the JSON, but for this example, we'll create a local file the test will access.

On your angular project:
- Navigate to the `src/assets` file;
- Create a new file named `payload.json`;
- Open this new file and copy the content below:

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
Beagle's library comes with many pre-defined components ready to be used in their project. 
The code above creates a JSON with two of these components: container and text.
```

Now, open the `beagle.module.ts` file generated in the previous step and add as a baseUrl the path: http://localhost:4200/assets:

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

Well done, your configuration is ready! Now, you will see how to render mapped components on JSON.


#### **Step 3: Using beagle-remote-view**

After you created the JSON, you need to add a local inside the application, where the components will be rendered. To make this action, Beagle's library provides the component **`<beagle-remote-view>`**.

1. Open the file **`app.component.html`** and replace all the content with this code:
```
<beagle-remote-view [loadParams]="loadParams"></beagle-remote-view>
```

2. The component above needs to receive a **`loadParams`** mandatory propriety.Open the **`app.component.ts`** file and import LoadParams as the following example:

`import { LoadParams } from '@zup-it/beagle-web';`

3. State the variable that will be used on the template:

```
loadParams: LoadParams;

constructor() {
  this.loadParams = {
    path: '/payload.json'
  };
}
```

> In this path, we use the **/payload.json** value that will be associated to the baseUrl from the previous step, to create a path to access our JSON files.

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

### **Test the application**
Run one of the commands below to initialize the application: 

If you use npm:
```
npm run serve
```

If you use yarn: 

```
yarn serve
```


>It's important to mention the command used to restart the application is fundamental to make the changes you intend to make in Beagle's configurations files work. This process must be done for any change made on @Input() properties of your mapped components. Beagle's team is constantly developing solutions to improve this.


After you finished this configuration, access the local: `http://localhost:4200`.
You should see the screen with the text present in the text attribute in the JSON above:  

`Well done, you created your first screen with Beagle!`


## **Documentation**

You can find Beagle's documentation on our [**website**][site].

Beagle's documentation discusses components, APIs, and topics that are specific to [**Beagle documentation**][b-docs].

[site]: https://usebeagle.io/
[b-docs]: https://docs.usebeagle.io/


## **Contributing**

If you want to contribute to this module, access our [**Contributing Guide**][contribute] to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes to Beagle.

[contribute]: https://github.com/ZupIT/beagle-ios/blob/main/CONTRIBUTING.md

### **Developer Certificate of Origin - DCO**

 This is a security layer for the project and for the developers. It is mandatory.
 
 Follow one of these two methods to add DCO to your commits:
 
**1. Command line**
 Follow the steps: 
 **Step 1:** Configure your local git environment adding the same name and e-mail configured at your GitHub account. It helps to sign commits manually during reviews and suggestions.

 ```
git config --global user.name “Name”
git config --global user.email “email@domain.com.br”
```

**Step 2:** Add the Signed-off-by line with the `'-s'` flag in the git commit command:

```
$ git commit -s -m "This is my commit message"
```

**2. GitHub website**
You can also manually sign your commits during GitHub reviews and suggestions, follow the steps below: 

**Step 1:** When the commit changes box opens, manually type or paste your signature in the comment box, see the example:

```
Signed-off-by: Name < e-mail address >
```

For this method, your name and e-mail must be the same registered on your GitHub account.

## **Code of Conduct**

Please read the [**code of conduct**](https://github.com/ZupIT/beagle/blob/main/CODE_OF_CONDUCT.md).

## **License**

[**Apache License 2.0**](https://github.com/ZupIT/beagle-web-angular/blob/main/LICENSE).


## **Community**
Do you have any question about Beagle? Let's chat in our [**forum**](https://forum.zup.com.br/). 