# Pull last release from git repo
```bash
# Get new tags from the remote
git fetch --tags --force

# Get the latest tag name, release
latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)

# Checkout the latest tag
git checkout $latestTag
```
