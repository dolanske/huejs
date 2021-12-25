# hue development notes

- [ ] Router

  - [x] Make sure to add default route for '' and make support for it
  - [x] Support back() and forward()
  - [x] Add router-link component
  - [x] FIX: Fix router view components not updating the DOM tree on update.

  - [ ] Support for query string
  - [ ] Passing props to components
  - [x] Add active class to active RouterLink

  ***

- [ ] State

  - [ ] First iteration should be a simple state object which should reflect in other components

  ***

- [ ] Style Generation

  - [ ] CSS in JS per component (might be as easy as adding a formatting function and inserting it into a style prop during component rendering)
    - [x] Make <style> component creation generic
    - [x] Add createStyle({styles}, scoped: true | false) function that takes in an object of css styles to apply
      - [x] Must be reactive - Doesn't have to be, it gets updated on re-render
      - [x] If scoped is true, create a unique classname & add a new <style> to the head. If not (default: just appent inline styling)
      - [x] Style component isn't tied to an ID, it generates all the time, fix that and this is done
      - [x] SCOPED still not implemented (returned class name should be composed of input id + generated ID)
    - [ ] Rewrite css.js in typescript
    - [ ] Add support for :hover, child selectors, try utilizing js etc instead of just ":hover" etc

  ***

- [ ] Reactivity

  - [ ] implement computed(callback: void)
  - [ ] implement watch(property: reactive, callback: void)

- [ ] Create a compiler, adds some boilerplate to the components (RETHINK)

  - [ ] Test if tempalte string usage is possible
  - \*\*[ ] Rethink add auto injection of createTemplate during rendering. Components should only contain a render function which returns a string template

  - [ ] Add some unique identifier to each component to create reusability
  - [ ] Sanitize non-html default props and remove them when creating a DOM component
  - [ ] Slots
  - [ ] Scoped styles (see TODO in css.js:153)

  ***

- [ ] Lifecycle hooks
  - onCreated()
  - onUpdated()
  - beforeDestroy()

---

# Bugs

- [x] Fix global styling generating scoped components too
- [ ] Currently CSS generates nested css, need to change it to stack class names / selectors
