# Test Technique - Front


ℹ️ **What you’ll need to start this exercice :**

- Node (v18) and npm (or Yarn) installed
- An IDE (ex: Visual studio Code)
- A Github Account

## 1 - Start the react app

You can use **styled-component** to handle the styling of the application o the styling utility you want,  You can use **axios** to handle the request, otherwise, **you shouldn’t need another exernal lib**.

The design for the app is available on figma : https://www.figma.com/file/byWsR8DaV3gp9Ggi6d0QsC/Test-d%C3%A9veloppement?node-id=0%3A1

>You will have to create an account to use the file correctly and extract the correct style values.

You don't have to keep the current App.tsx content and associated style 😉

- The app and the components must be in **Typescript**

- The app should be usable in mobile : the elements should be positioned one below the other to handle the responsive.

- The form can be open and close with the arrow toggle

- You can use any image for the background image in the form

## 2 - Create your github token

Create a github token for your account ([https://github.com/settings/tokens](https://github.com/settings/tokens))

Select “New personal access token (classic)”

You need the allow the following scopes for the token :

- **repo** (repo:status, public_repo)
- **user** (read:user)

## 3 - Fetch the current user account from the API

Retrieve the current user linked to the token with the endpoint : `https://api.github.com/user`

More info about the endpoint here : [https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)

We want to display the following properties:

- the name
- the github pseudo (login)
- the location
- the avatar if available (otherwise, you can use a any placeholder)
- the bio if available

## 4 - Fetch the current user repositories

Retrieve the user repositories with the endpoint: `https://api.github.com/user/repos`

More info about the endpoint here : [https://docs.github.com/fr/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user](https://docs.github.com/fr/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user)

The repositories should be display inside a list.

You can only display the first 100 items if you have more.

The list should be sorted from the most recent repo to the oldest one.

We want to display the following properties:

- the name
- the url of the repo (html_url)
- the owner of the repo
- the number of stars
- If the repo is private or public

## 5 - Create a form to generate new repository

Create a form to allow the creation a new repository using this endpoint : [`https://api.github.com/user/repos`](https://api.github.com/user/repos)

More info about the endpoint here : [https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-for-the-authenticated-user](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-for-the-authenticated-user)

We need to send the following properties:

- name
- private ( as boolean)
- description(optional)
- homepage URL(optional)

You need to implement validation rules on the form to prevent submission error : the field'borders must be red in this case.
But you also need to handle API error (Ex: you already have a repo with the same name)

We want to see the new repository inside the list after its creation

## 6 - Implement the fav/unfav feature of a repository

Add a button on the repository item list to allow the user to star or unstar the repository with the endpoint : [`https://api.github.com/user/starred/<owner>/<repo>`](https://api.github.com/user/starred/<owner>/)

More info about the endpoint here : [https://docs.github.com/en/rest/activity/starring?apiVersion=2022-11-28#star-a-repository-for-the-authenticated-user](https://docs.github.com/en/rest/activity/starring?apiVersion=2022-11-28#star-a-repository-for-the-authenticated-user)

We want to see the repository star count updated after the action

The star should be yellow if the user has starred the repo

## Bonus 1 - Form display

The form should be open by default on desktop, and close on mobile

## Bonus 2 - Add a pagination

Instead of showing 100 items, we could implement a pagination to show page of 10 items only.

## Bonus 3 - Add some filters

Implement a filter to show all the repositories, only the private repositories or only the public repositories

## Bonus 5 - Add some tests

Add some unit test with jest.

## Bonus 5 - Dockerise the application

Pack the application inside a docker
