# Blogium API 

This is the API for Blogium, a blogging platform inspired by Medium. It has a simplistic and minimalist style to allow users to focus on reading and writing blog posts. It features a fully functional text editor that I built from scratch using JavaScript. The editor is designed to be simple and easy to use allowing the user to focus on their writing. Anyone can read posts on Blogium and users can easily create an account to get started writing their own posts.

## Tech

Blogium was created with React, NodeJS, Express, PostgreSQL, and Firebase. It is a Full-Stack web app and you can view the client repo [here](https://github.com/f3ve/Blogium)

## Live app

You can view the live app [here](https://blogium.now.sh/)

## API Documentation

### Auth Endpoints

### > `POST /api/auth/login`

Validates the login credentials against the database and if they are valid returns a JWT

**Sample request Body**

```json
{
  "username": "example",
  "password": "example-password"
}
```

**Sample Response Body**

```json
{
  "authToken": "thISisASampLEjwtAUthToKEN"
}
```
### > `POST /api/auth/refresh`

Validates the users JWT that is about to expire and sends a new JWT

### Comments Endpoints

### > `POST /api/comments

After validating user JWT saves a new comment to the database and responds with the serialized comment. 

**Example Request Body**

```json
{
  "content": "test comment",
  "post_id": 1
}
```

**Example Response Body**

```json
{
  "id": 1,
  "content": "test comment",
  "post_id": 1,
  "date_created": "2020-06-19T22:22:33.937Z",
  "user": {
    "id": 1,
    "username": "exampleUser",
    "img": "./example/img/url.png"
  }
}
```

### > `DELETE /api/comments/:comment_id

After validating user credentials removes comment from database'

**Sample Query**

```
  api/comments/1
```

### Posts Endpoints

### > `GET /api/posts`

Returns an array of all the published posts in the database

**Example Response Body**

```json
[
  {
    "id": 1,
    "title": "sample title",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec nunc ut eros mattis placerat sed vel ligula. Donec et tincidunt lorem. Quisque facilisis ac ipsum eu commodo. Vestibulum porttitor id leo in semper. Integer vehicula consectetur tellus, non congue risus. Nulla ac risus at mi blandit pharetra. Aliquam sollicitudin nulla neque, ut convallis ante luctus at. Aliquam a bibendum mi. Nunc scelerisque semper sapien, at dignissim augue fermentum in. Etiam tincidunt urna non quam condimentum sollicitudin. Integer auctor facilisis massa, sed sollicitudin enim semper quis. Sed consectetur ex eu mauris semper, nec tempor libero mattis. Morbi non consectetur est. Sed sit amet sem at nisl fermentum vulputate. Duis quam quam, pulvinar a erat a, aliquam consectetur ligula. ",
    "date_created": "2020-06-19T22:22:33.937Z",
    "date_modified": "2020-06-19T22:22:33.937Z",
    "published": true,
    "user": {
      "id": 1,
      "username": "exampleUser",
      "img": "./example/img/url.png",
      "bio": "example user bio"
    }
  }
]
```

### > `POST api/posts`

After validating user credentials saves new post in the database and returns the serialized post

**Example Request**

```json
{
  "title": "example title",
  "content": "example content",
  "published": false
}
```

**Example Response** 

```json
{
  "id": 1,
  "title": "example title",
  "content": "example content",
  "date_created": "2020-06-19T22:22:33.937Z",
  "date_modified": "2020-06-19T22:22:33.937Z",
  "published": false,
  "user": {
    "id": 1,
    "username": "exampleUser",
    "img": "./example/img/url.png",
    "bio": "example user bio"
  }
}
```

### > `GET /api/posts/drafts`

After validating user credentials returns an array of all drafts that belong to that user

**Example Response**

```json
[
  {
    "id": 1,
    "title": "sample title",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec nunc ut eros mattis placerat sed vel ligula. Donec et tincidunt lorem. Quisque facilisis ac ipsum eu commodo. Vestibulum porttitor id leo in semper. Integer vehicula consectetur tellus, non congue risus. Nulla ac risus at mi blandit pharetra. Aliquam sollicitudin nulla neque, ut convallis ante luctus at. Aliquam a bibendum mi. Nunc scelerisque semper sapien, at dignissim augue fermentum in. Etiam tincidunt urna non quam condimentum sollicitudin. Integer auctor facilisis massa, sed sollicitudin enim semper quis. Sed consectetur ex eu mauris semper, nec tempor libero mattis. Morbi non consectetur est. Sed sit amet sem at nisl fermentum vulputate. Duis quam quam, pulvinar a erat a, aliquam consectetur ligula. ",
    "date_created": "2020-06-19T22:22:33.937Z",
    "date_modified": "2020-06-19T22:22:33.937Z",
    "published": false,
    "user": {
      "id": 1,
      "username": "exampleUser",
      "img": "./example/img/url.png",
      "bio": "example user bio"
    }
  }
]
```

### > `GET /api/posts/:post_id`

Returns the requested post

**Sample Query**

```
/api/posts/1
```

### > `DELETE /api/posts/:post_id

after validating user credentials deletes the specified post from the database

### > `PATCH /api/posts/:post_id

after validatig user credentials updates the specified post with the new data

**Example Request Body**

```json
{
  "content": "example post content",
  "title": "Example Title",
  "published": true
}
```

### > `GET /api/posts/:post_id/comments`

Returns an array of comments for the specified post

**Sample Query**

```
GET /api/posts/1/comments
```

**Example Response**

```json
[
  {
    "id": 1,
    "content": "test comment",
    "post_id": 1,
    "date_created": "2020-06-19T22:22:33.937Z",
    "user": {
      "id": 1,
      "username": "exampleUser",
      "img": "./example/img/url.png"
    }
  }
]
```