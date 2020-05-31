git config --global user.email "benoit.gaudou@gmail.com"
git config --global user.name "benoitgaudou"
git config --global push.default simple
git status
git remote rm origin
git remote add origin https://benoitgaudou:$GH_token_public_repo@github.com/benoitgaudou/testGitHubAPI.git
git commit ./docs/assets/data/* --message "update data"
git status
git push origin HEAD:master