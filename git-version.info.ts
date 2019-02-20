declare const require;
export const versionInfo = (() => {
    try {
        // throws warning when the below file is not available... which is expected
        // this file gets auto-generated during build-* tasks...
        return require('./git-version.json');
    } catch {
        // On dev/serve the above file might not exist, so return some a value for version
        return { version: '0.0.0' };
    }
})();
