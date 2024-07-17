# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#React Router-
(1)Each URL is matched to a component.
(2)When router link is clicked,URL is changed and the DOM is updated.
(3). In single page applications, there is no page reload
(4). Application is executed entirely on client browser.
(5). The url is an excellent place to store state and can be an alternative to useState. Open/Closed
items,currently selected items,list sorting order can be stored in url.
(6).Placing state in the url is a nice way to make it accessible to all components.
(7).Good way to pass data from one page to another.
(8).params and query string can be used for this purpose.

##Bundle Splitting Optimization-

(1).When the client requests application from server,it sends a bundle containing the javascript code from the entire react app.
(2).Bundle size is the amount of javascript code the cleints will have to download to start using this SPA.
(3). Instead of sending the whole application at once, in bundle splitting, the application is sent in small sizes for the users to download over time.
(4).Tools used are lazy import, Suspense api and fallback prop.
(5). Donot optimize prematurely, donot wrap every objetc and fucntion is useCallback or useMemo,
instead watch out for laggy ui and real performance issues.
(6).Optimize a context inly if it has many consumers by memoizing its value or memoizing its child components.

####Rules to use the useEffect hook-

(1).Every state,prop,context value used inside the useEffect hook must be passed into the dependency
array.
(2). All Reactive values must be included in the dependency array.(Any state, prop,variable dependent on state/prop).
(3).Dont include onjects/functions in the dependency array.
(4). If we donot wish to include the helper function in the dependency array, we must place the helper function inside the useEffect hook.
(5). If some objects/functions are not reactive, they can be moved out of the component.
(6). We must not use the useEffect hook to respond to events/it must be avoided in fetching data
on the initial render.
