# karmatha.github.io

This repo hosts my portfolio website. It is hosted on [GitHub pages](https://pages.github.com/) and uses the [Jekyll](https://jekyllrb.com/) static site generator.

The choice for a static site was a logical one, I don't need a CMS and complete back-end for this project. And being hosted by GitHub means I can update it easily from anywhere. Also it allows for anyone interested to have a look at the source code. Finally with everything being under source control it makes it easy to go back to a previous version.

## To run locally: 

- install jekyll (https://jekyllrb.com/docs/installation/)
- clone the repo: `git clone git@github.com:karmatha-nl/karmatha.github.io.git` 
- run jekyll: `$jekyll serve --watch --baseurl=''`

## To add a project

- Add a <projectname>.md file in `/projects`
- Add the project to the `projects` collection in `/index.md` using <projectname> for `id`
- In `/css/home.scss`, add a css declaration like so `#projectlist a#<projectname>` 

## To deploy
Just git push and deploy will happen automatically