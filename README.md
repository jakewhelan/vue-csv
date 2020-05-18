# vue-csv

![hero](https://i.gyazo.com/14ae6ac16db1c49ccd2e042099aff951.gif)

`vue-csv` is a simple PWA for parsing and interacting with `.csv` files. The app was built using Vue, Vuex, Webpack, and ES2020 compliant JavaScript. 

## Progressive Web App 
`vue-csv` is a full-featured Progressive Web App - meaning it can be installed to your device like a native app and includes an offline mode.

![install](https://i.imgur.com/hX3GAtU.png)
![desktop-app](https://i.imgur.com/g5DhaP6.png)

## Session persistence
`vue-csv` remembers who you are and automatically logs you back in when you return

## View, search, filter
The `vue-csv` dashboard allows you to view, search and filter your data, including large files with 200k+ rows.

![dashboard](https://i.imgur.com/UGgdMVb.png)

## Built for all devices big and small
It works on mobile, and tablets too!

![mobile](https://i.gyazo.com/101d9a026c772ad468e423961c116aca.gif) ![mobile2](https://i.gyazo.com/e5c19eea88d58dbee5b11eccfb073dcf.gif)

## Code-splitting and lazy loading
To improve caching and reduce initial payload size, `vue-csv` employs very granular code-splitting where each individual dependency is cached independently and every page of the app is lazy-loaded on-demand and cached independently.

# Getting started

## Disclaimer
Although some language in the application and accompanying documentation (this file) implies a server exists, this proof of concept application is 100% client-side and only attempts to loosely mock APIs that would otherwise be server-side.

## Requirements

`vue-csv` requires Node.js LTS (12.16.x) and npm 6.x

## Browser support

__It is recommended that you use Google Chrome 81+ for the best experience.__

`vue-csv` comes bundled with polyfills to support ES2020 and supports all _modern_ browsers. It does not support Internet Explorer 11.

## Running the app

Install dependencies
```
# from project root
npm i
```

Run app
```
npm start
```
The app will open in your default browser at `http://localhost:8080/`. If this doesn't happen, please manually open `http://localhost:8080/` in your favourite browser.

`vue-csv` comes with distribution files included to provide further ease in running the app for the first time, no build is required.

## Logging in
The follow credentials are valid:
| Username      | Password      |
| ------------- | ------------- |
| jake          | 1234          |
| richard       | 5678          |
| thomas        | abcd          |

These are the only valid credentials, all others will return an error.

## Advanced

### Running the app for development

Run in dev mode, with hot module reloading
```
npm run dev
```
It's recommended during development that you disable the service worker by choosing "Bypass for network" in your development tools, service worker section, and then perhaps deleting the service-worker from your browser completely.

### Build app for production

Build app with production optimisations, and PWA features enabled
```
npm run build
```