## 2.0.0 (02 Oct, 2017)

### New Features

* Rewritten to introduce new way of using this library. In addition to the existing higher order component, this library now exports a new class, built using the 'function as child component' pattern
* The higher order component now accepts a params object as a function, meaning any params can be added to the container div
* The build is now done via Rollup. In addition, two packages are distributed; one for Common JS and one for ESM Modules

### Breaking Changes

* The higher order component no longer accepts the clickOutsideClassName property. Instead pass any options to the container div as a params object
* The container div no longer adds the style display: inline-block

## 1.0.4 (15 Apr, 2017)
* Upgrade dependencies and ensure compatibility with React 15.5+

## 1.0.3 (01 Apr, 2017)
* Upgrade dependencies
* Use Jest setup file for easier Enzyme testing

## 1.0.0 (26 Nov, 2016)

* Initial public release