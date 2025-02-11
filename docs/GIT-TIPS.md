# GIT TIPS

## Compare remote and local
git status

## Reset Local Changes and Pull Latest from Remote
git fetch origin
git reset --hard origin/main  # Replace 'main' with your branch name
git pull origin main          # Replace 'main' with your branch name

## Alternative (If You Have Untracked Files i.e. git add . is not used)
git clean -df                 # Removes untracked files and folders


git fetch origin → Fetches the latest changes from the remote repo.
git reset --hard origin/main → Resets your branch to match the remote, deleting local changes.
git pull origin main → Ensures you're fully up-to-date.
git clean -df → Deletes untracked files and directories.