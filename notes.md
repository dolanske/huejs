# hue development notes

- [x] Split functionality into files
- [x] Fix rendering of child nodes
- [x] Props - components are actualy defined as functions now
- [x] CSS in JS generator

- [ ] Router

  - [x] Make sure to add default route for '' and make support for it
  - [x] Support back() and forward()
  - [x] Add router-link component
  - [x] FIX: Fix router view components not updating the DOM tree on update.

  - [ ] Support for query
  - [ ] Passing props

- [x] Add support for generating multiple classes from 1 style ( I think just split by space & use addStyles instead of addStyle)
- [x] When generating colours, remove # from class name & generate classname
- [ ] Add global state management
  - [ ] First iteration should be a simple state object which should reflect in other components
- [ ] CSS in JS per component (might be as easy as adding a formatting function and inserting it into a style prop during component rendering)
  - [x] Make <style> component creation generic
  - [x] Add createStyle({styles}, scoped: true | false) function that takes in an object of css styles to apply
    - [x] Must be reactive - Doesn't have to be, it gets updated on re-render
    - [x] If scoped is true, create a unique classname & add a new <style> to the head. If not (default: just appent inline styling)
    - [ ] Style component isn't tied to an ID, it generates all the time, fix that and this is done
  - [ ] Rewrite css.js in typescript

## Backburner

- [ ] Create a compiler, adds some boilerplate to the components
  - [ ] Add some unique identifier to each component to create reusability
- [ ] Lifecycle hooks
