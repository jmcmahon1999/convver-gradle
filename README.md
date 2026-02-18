# convver-packwiz

A plugin for [convver](https://github.com/jmcmahon1999/convver) to add support for [gradle](https://gradle.org/)

See the convver [README](https://github.com/jmcmahon1999/convver/blob/master/README.md) for more detailed instructions.

## Usage

Command line:

```sh
# Query local gradle.properties file.
convver local gradle # 1.2.3

# Update local gradle.properties file.
convver update gradle # 1.2.4
```

As a node module:

```js
const convver = require('convver');

// Query local gradle.properties file.
convver.local('gradle'); // 1.2.3

// Update local gradle.properties file.
convver.update('gradle');
```

Example GitHub Actions workflow:

```yaml
name: Automatic Versioning

on:
  push:
    branches:
      - main
      - master

jobs:
  version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          fetch-tags: true
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Set Credentials
        run: |
          git config --global user.name "${GITHUB_ACTOR}"
          git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
      - run: |
          npm install -g @jmcmahon1999/convver --@jmcmahon1999:registry=https://npm.pkg.github.com/
          npm install -g @jmcmahon1999/convver-gradle --@jmcmahon1999:registry=https://npm.pkg.github.com/
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Convver Update
        id: convver-update
        run: convver update npm -q
      - name: Push Changes
        if: steps.convver-update.outcome == 'success'
        run: git push --follow-tags
```