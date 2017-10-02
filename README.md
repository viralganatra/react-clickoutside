# React Click Outside

[![build status](https://img.shields.io/travis/viralganatra/react-clickoutside/master.svg?style=flat-square)](https://travis-ci.org/viralganatra/react-clickoutside)
[![npm version](https://img.shields.io/npm/v/react-clickoutside.svg?style=flat-square)](https://www.npmjs.com/package/react-clickoutside)

This is a higher order component for detecting when a click event has occured outside of a given component.

It supports both class based components and stateless functional components.

## Demo

https://viralganatra.github.io/demos/react-clickoutside/


## Installation

Using `yarn`

```
yarn add react-clickoutside
```

or `NPM`

````
npm install --save react-clickoutside
````

## New in Version 2

In addition to the existing higher order component, this library now exports a new component, built using the 'function as child component' pattern.

See: https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9

The higher order component now accepts a params object, meaning any properties can be added to the container div.

Introduced Rollup to export two packages; one for Common JS and one for ESM Modules.

## How to use

### Basic functionality

#### Using the Function as Child Component approach

````js
import React from 'react';
import { ClickOutside } from 'react-clickoutside';

const MyComponent = () => (
    <div>
        <p>My Component</p>
        <ClickOutside>
            {({ hasClickedOutside }) => (
                <div>
                    <p>Click Outside</p>
                    {hasClickedOutside && <div>Has Clicked Outside</div>}
                </div>
            )}
        </ClickOutside>
    </div>
);

export default MyComponent;
````

#### Using the Higher Order Component

````js
import React, { Component } from 'react';
import { withClickOutside } from 'react-clickoutside';
import MyComponent from './my-component';

const ComposedComponent = withClickOutside()(MyComponent);

export default class Demo extends Component {
    onClickOutside = () => {
        // Do something...
    }

    render() {
        return (
            <ComposedComponent
                onClickOutside={this.onClickOutside}
            />
        );
    }
}
````

The composed component must have the attribute onClickOutside which should be a function.

### Customising

The Component will add a wrapping `div` element to your component. You can add any attributes to this:

#### Using the Function as Child Component component

````js
const MyComponent = () => (
    <div>
        <p>My Component</p>
        <ClickOutside className="my-class">
            {({ hasClickedOutside }) => (

            )}
        </ClickOutside>
    </div>
);
````

#### Using the Higher Order Component

````js
import React, { Component } from 'react';
import { withClickOutside } from 'react-clickoutside';
import MyComponent from './my-component';

const ComposedComponent = withClickOutside({
    className: 'my-class',
})(MyComponent);
````

## Notes

Both components will add a wrapping `div` element to your component. This is because internally we need to obtain a reference to the container DOM node and use that to calculate if the clicked target node is a child of the container. The problem is that while we can obtain a reference to the node using the ref attribute when the decorated component exposes a regular HTML element, when the ref attribute is used on a custom component the ref callback receives the mounted instance of the component.

<https://facebook.github.io/react/docs/refs-and-the-dom.html>

In addition using findDOMNode is now discouraged and the React team has plans to deprecate it:

<https://github.com/yannickcr/eslint-plugin-react/issues/678>

## Compatibility

React v15 or v16 is a peer dependency.

## License

[MIT](LICENSE)