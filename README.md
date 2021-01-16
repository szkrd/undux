# Undux

Maybe you don't need [Redux](https://redux.js.org/).

_**Warning**: opinionated text below._

Redux (and Flux) is a nice idea, but it's closer to state machines and game development (with one global state) than traditional MVC web apps or (two-way) data binding - which of course is not a problem.

The problem is verbosity - [redux toolkit](https://redux-toolkit.js.org/) alleviates the pain somewhat, but it tries to fix Redux, when maybe, you don't need Redux™.

Honestly, writing vanilla redux is not _terribly_ hard - you need a handful of snippets (or live templates) that generates code for you; it's bearable with vanilla js. It gets kinda verbose with typescript. But the real fun starts when you have to move things around or refactor stores, modify existing logic: 💣

I do love [sagas](https://redux-saga.js.org/), but after moving to **thunks**, they do seem like an overkill... so we have thunks and middlewares: thunks blur the mental boundary between middlewares and actions - and that's not a bad thing. At the end of the day the whole web revolves around **sideffects**. You know, like calling an API. Or hitting back in the browser.

So.

1. I don't really care for time travel debugging (or in fact for the whole [redux devtool](https://github.com/reduxjs/redux-devtools) - heck, the [amount of packages](https://github.com/reduxjs/redux-devtools/issues/530) and the complexity in that thing just makes my eyes bleed).
2. "Browser things" are side effects (storage, console, navigation etc.), I don't want to treat them in any special way.
3. I want a global state, that can be written from central places (so it is NOT tied to components) and can be wired into components (for readonly representation).
4. I want to avoid complexity and magic if possible (mobx, magical binders, proxies, rx, zones etc.).
5. I don't care for actions, actionCreators, dispatchers, middlewares, thunks, sagas - I want to read and write the store in a sane, comprehensible manner, be that an immediate action or a long running one (like calling an API).
6. I want the code to be 100% discoverable (show usages) - no string getter/setter paths, no lodash get, no watchers, no computeds etc.

## Running the examples

- `cd example-1`
- `npm i && npm run dev`
- open http://localhost:3000/

## Example-1

1. strict equality (===) for change detection
2. services write the state, methods can be sync or async
3. writing fires event, every component listens for change, unsubscribes on unmount (via single hook):  
   `const todoItems = useAppState<ITodoItem[]>((state) => state.todoItems);`
4. store section access (r/w) is discoverable from any leaf of the store

## Example-2

TODO. I have an rx one (without recreating ngrx) _somewhere_, from the time when I worked exclusively on angular projects.
