const queryGithub = require('../util/query-github');

module.exports = function checkVersions() {
  console.log(`${new Date().toString()}: Checking for new versions`);
  return Promise.all([get('module'), get('electron')])
    .then(([moduleReleases, electronReleases]) => {
      return {
        moduleReleases,
        electronReleases
      };
    });
};

function get(which) {

  return queryGithub(which, 'releases')
    .then((response) => {
      var releases = response.body || [];

      switch(releases.length) {
        case 0: {
          return Promise.reject('No releases');
        }
        case 1: {
          return [releases[0]];
        }
        default: {
          return [releases[0], releases[1]];
        }
      }
    });
}
