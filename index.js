const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const exec = require('@actions/exec');
const GhostAdminApi = require('@tryghost/admin-api');

(async function main() {
    try {
        const url = core.getInput('api-url');
        const api = new GhostAdminApi({
            url,
            key: core.getInput('api-key'),
            version: 'canary'
        });

        const basePath = process.env.GITHUB_WORKSPACE;
        const contentPath = path.join(process.env.GITHUB_WORKSPACE, 'posts');
        fs.readdir(contentPath, function (err, files) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            files.forEach(function (file) {
                console.log(file);
            });
        });

        // Deploy it to the configured site
        //await api.themes.upload({file: zipPath});
        console.log(`Content successfully uploaded.`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}());
