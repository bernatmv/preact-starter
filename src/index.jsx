import { render, h } from 'preact';
import './index.sass';
import App from './app';
import configureStore from './app/configureStore';

const dataStore = window.__INITIAL_STATE__; // eslint-disable-line
const store = configureStore(dataStore); // eslint-disable-line
let elem;
function init() {
	elem = render(<App store={store}/>, document.getElementById('root'), elem);
	window.app = elem;
}

init();

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/service-worker.js');
	}

	// add Google Analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-XXXXXXXX-X', 'auto');
	ga('send', 'pageview');
} else {
	// use preact's devtools
	require('preact/devtools');
	// listen for HMR
	if (module.hot) {
		module.hot.accept('./app', init);
	}
}
