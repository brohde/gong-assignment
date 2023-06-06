# Gong Web Dev Assignment

## Installation
Clone this repo and then follow the instructions below. Both `server` and `frontend` need to be running at the same time.

### server/

1. Download and install MAMP. I'm using `MAMP_MAMP_PRO_6.8-Intel-x86.pkg` on MacOS.
2. Run MAMP Application.
3. Ensure the following configuration:
   * Document root: Path to `server/` directory.
   * Web server: Apache
   * PHP version: 8.2.0
   * Port: 8888
4. Click "Start" to start MAMP.
5. Navigate to [phpMyAdmin](http://localhost:8888/phpMyAdmin5/). Create a new database called `gong_assignment`. Import `MOCK_DATA.sql` into database.
6. Navigate to http://localhost:8888/ . If you see a JSON response, you're all set.

### frontend/

1. Clone the repo
2. `yarn install`
3. `yarn dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Notes
* Normally I would not build a project that relies on any user dependency like MAMP. It would be much better to build this in Docker so that installation is easier for the developer and to match the dev enviornment as closely as possible with production.
* There is some FOUC (flash of unbehaviored content) when the front end page loads, since I am not handling the loading state gracefully.
* See additional comments throughout code.
