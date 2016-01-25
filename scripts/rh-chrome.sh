 #!/bin/bash
 meteor build ../chrome --directory $BUILD_OPTIONS

 cp -R $PATH_TO_CHROME ../chrome/bundle/programs/chrome