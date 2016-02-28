 #!/bin/bash
sudo meteor build bundle --directory $BUILD_OPTIONS

 cp -R $PATH_TO_CHROME bundle/programs/web.chrome