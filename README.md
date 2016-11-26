# React Click Outside

[![build status](https://img.shields.io/travis/viralganatra/react-clickoutside/master.svg?style=flat-square)](https://travis-ci.org/viralganatra/react-clickoutside)
[![npm version](https://img.shields.io/npm/v/react-clickoutside.svg?style=flat-square)](https://www.npmjs.com/package/react-clickoutside)

This is a higher order component for detecting when a click event has occured outside of a given component.

It supports both class based components and stateless functional components.


## Installation

Using `yarn`

```
yarn add react-clickoutside
```

or `NPM`

````
npm install --save react-clickoutside
````

## How to use

### Basic functionality

````js
import React from 'react';

const MyComponent = () => {
    return <div>My Component</div>;
}

export default MyComponent;
````

````js
import React, { Component } from 'react';
import ClickOutside from 'react-clickoutside';
import MyComponent from './my-component';

export default class MyComposedClass extends Component {
    onClickOutside() {
        // Do something...
    }

    render() {
        const ComposedComponent = ClickOutside(MyComponent);

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

This higher order function will add a wrapping `div` element to your component. By default it will add a style with `display: inline-block`. If you wish to use a class name you can use the clickOutsideClassName attribute.

````js
export default class MyComposedClass extends Component {
    render() {
        const ComposedComponent = ClickOutside(MyComponent);

        return (
            <ComposedComponent
                onClickOutside={this.onClickOutside}
                clickOutsideClassName="my-class-name"
            />
        );
    }
}
````

## Notes

This higher order function will add a wrapping `div` element to your component. This is because internally we need to obtain a reference to the container DOM node and use that to calculate if the clicked target node is a child of the container. The problem is that while we can obtain a reference to the node using the ref attribute when the decorated component exposes a regular HTML element, when the ref attribute is used on a custom component the ref callback receives the mounted instance of the component.

<https://facebook.github.io/react/docs/refs-and-the-dom.html>

In addition using findDOMNode is now discouraged and the React team has plans to deprecate it:

<https://github.com/yannickcr/eslint-plugin-react/issues/678>

## Compatibility

React v15.4.0 is a peer dependency.

## License

[MIT](LICENSE)