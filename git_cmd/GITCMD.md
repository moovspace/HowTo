### Get remote repo
```sh
# Clone
git clone <url.git>
git clone <url.git> <branchname>

# Add remote
git remote add <branch> git://url.git

# Update
git fetch
git fetch origin
git fetch <branch>
```

### The example below show You how to made a single release cycle. You should create a central repository. 
You create a develop branch
```sh
# Create branch
git branch develop
git push -u origin develop

# Or
git checkout -b <branch> origin/<branch>
git checkout --track origin/<branch>
```

### Show branches
```sh
# Show
git branch -a
git branch -v
git branch -vv
git branch -avv
git branch --merged
git branch --no-merged
git branch -r

# Update branch
git fetch <remote> <branch>
git fetch
git fetch --all

# Delete local
git branch -D <branch>

# Delete remote
git push origin --delete <branchname>
```

### This branch contain the complete history of your project, now whereas your master contain new version. Your team should now clone the central repository and create a tracking branch for develop.
You create a tracking branch for develop
```sh
git clone ssg: //user@/path/
git checkout -b develop origin/develop 
```

### Everybody now has a local copy of the historical branches set up. So You decide to make a new feature. For that You create separate branches for your respective features with base a your develop branch.
You begin a new feature
```sh
git checkout -b some-feature develop
```

### You can to add commits to the feature branch as You wish, then:
```sh
git status
git add <some-file>
git commit
```

### You finishes your feature
After adding new features, You decides that your feature are ready, now You can merge it into your local develop and push it to the central repository, like so:
```sh
git pull origin develop
git checkout develop

# Merge branch
git merge <some-feature>
git merge --no-ff <some-feature>

# Push 
git push
git push origin <some-feature>

# Delete local, remote
git branch -d <some-feature>
git push origin --delete <branchname>
```

### The first command makes sure the develop is up to date before trying to merge in the feature. Note that features should never be merged directly into master.
You begin to prepare a release. While others develop's working on his feature, You can to starts to prepare the first official release of project, You can to use a new branch to encapsulate the release preparations. This step is also where the release's version number is established:
```sh
# Cretae new relase branch
git checkout -b release-0.1 develop

# Or
git checkout -b release/release-0.1 develop
git commit -a -m "New verion 0.1"
```

### This branch is a place to clean up the release, test everything, update the documentation, and do any other kind of preparation for the upcoming release. It’s like a feature branch dedicated to polishing the release.
You finishes the release. Once the release is ready to ship, You merges it into master and develop, then delete the release branch.It's important to merge back into develop because critical updates may have been added to the release branch and they need to be accessible to new features. Like so:
```sh
# Merge
git checkout master
git merge release-0.1
git merge --no-ff release-0.1
git push

# Merge
git checkout develop
git merge release-0.1
git merge --no-ff release-0.1
git push

# Delete
git branch -d release-0.1
```

### You could to know that release branches act as buffer between feature development and public releases. Is good idea that whenevet You merge something into master, you should tag the commint for easy reference:
```sh
git tag -a 0.1 -m "Initial public release" master
git push --tags
git push origin --tags
```

### Create new branch from last tagged version
```sh
# Show tags
git tag
git show v1.5

# Create branch
git checkout v1.5
git checkout -b <branchname> v1.5
```

### Delete tag version
```sh
# Show
git show

# Delete
git tag -d v1.5-lw
git push origin --delete <tagname>
```

### Links
```txt
# git --no-ff 
https://nvie.com/posts/a-successful-git-branching-model/
https://kamiljozwiak.net/gitflow-czyli-jak-korzystac-z-gita-i-nie-zwariowac/

# git links
https://kamiljozwiak.net/gitflow-czyli-jak-korzystac-z-gita-i-nie-zwariowac/
http://www.inanzzz.com/index.php/post/cs32/working-with-git-release-branches
https://blog.axosoft.com/gitflow/
https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
```
