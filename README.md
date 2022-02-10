# About 
* js server hosted on [https://replit.com/](https://replit.com/), base url [progress-tracker.mystyrust.repl.co](progress-tracker.mystyrust.repl.co)
* somewhat a companion repo to [Quaranteens](https://github.com/mystyrust/quaranteen/tree/master/Quaranteens) ("fileExplorer" is hosted here, and some CYOA logic is handled here)

# Tools
* Node JS for the express server, vs code for local development
* everything is written in JS, html, and CSS 
* man i havent followed the best of practices here

# About iFrames
* iframes are basically "html documents within html documents" and can be used to insert a whole page or segment inside another page
* you can keep JS / CSS within an iframe without affecting the parent, allowing us to overcome CSS and JS limitations on AO3
* AO3 whitelists which websites you are allowed to iframe out to (youtube, etc) -- however you can iframe to an AO3 link, and then click out to any website you want. We will utilize this by orphaning an ao3 fic that prompts the reader to click. 
* The click will redirect them to a page hosted on the repl server, loading our custom content onto an AO3 iframe (social engineering baby...)
* this iframe "hack" is utilized in Ch 7 of [tired quaranteens](https://archiveofourown.org/works/27314074/chapters/66735937) to allow readers to "hack" into a file browser and type in a password 