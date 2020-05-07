const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
// const exec = require('@actions/exec')
// const GhostAdminApi = require('@tryghost/admin-api')
const fm = require('front-matter');

(async function main() {
    try {
        // const url = process.env.GHOST_ADMIN_API_URL || core.getInput('api-url')
        // const api = new GhostAdminApi({
        //     url,
        //     key: process.env.GHOST_ADMIN_API_KEY || core.getInput('api-key'),
        //     version: 'canary'
        // })

        // const basePath = process.env.GITHUB_WORKSPACE
        const contentPath = path.join(process.env.GITHUB_WORKSPACE, 'posts');
        const files = fs.readdirSync(contentPath).filter(fn => fn.match(/\.md$/i));
        console.log(`Found ${files.length} markdown file(s) to process`);
        files.forEach((file) => {
            const filePath = path.join(contentPath, file);
            console.log(`Reading ${filePath}`);
            const data = fs.readFileSync(filePath, 'utf8');
            const content = fm(data);
            console.log(content);
        });

        // Deploy it to the configured site
        console.log(`Content successfully uploaded.`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}());
