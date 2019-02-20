const git = require('git-rev-sync');
const { writeFileSync } = require('fs');

const gitInfo = {
    version: git.short(),
};

// will create a file on root directory
// ex: {"version":"80bb48d","branch":"bugfix/fix-sync-service-urls-on-config"}
writeFileSync('git-version.json', JSON.stringify(gitInfo));
