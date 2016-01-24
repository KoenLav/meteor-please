How to create a Meteor stand-alone app

# Build the app
cd app

meteor build ../build --directory

copy everything from build/bundle/programs/web.browser to aNewFolder

# Modify the files (see included index.html for an example)
rename head.html to index.html

rename the .css and .js file to app.css and app.js

add app.css and app.js to index.html

move everything from aNewFolder/app to aNewFolder/

get __meteor_runtime_config__ from a running app (e.g. http://localhost:3000)

add DDP_DEFAULT_CONNECTION_URL to the config (e.g. http://localhost:3000)

add the config to index.html above app.js

# Meteor Build Client
https://github.com/frozeman/meteor-build-client

# Meteor Server Picker
https://github.com/partus/meteor-server-picker