# hue 0.0.1

- [x] Split functionality into files
- [x] Fix rendering of child nodes
- [x] Props - components are actualy defined as functions now
- [x] CSS in JS generator

- [] Component structure

  - Try last shot at making components functional. Verify if reactivity works in deply nested functiona components and the reactivity issues I had previously were connected to the ROUTER View bug that needs solving first

- [] Router
  - [x] Make sure to add default route for '' and make support for it
  - [x] Support back() and forward()
  - [x] Add router-link component
  - [] FIX: Fix router view components not updating the DOM tree on update.
- [x] Add support for generating multiple classes from 1 style ( I think just split by space & use addStyles instead of addStyle)
- [x] When generating colours, remove # from class name & generate classname
- [] Add global state management
  - [] First iteration should be a simple state object which should reflect in other components
- [] CSS in JS per component (might be as easy as adding a formatting function and inserting it into a style prop during component rendering)

## Backburner

- [] Create a compiler, adds some boilerplate to the components
- [] Lifecycle hooks
