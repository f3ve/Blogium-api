# Blogium API 

This is the API for Blogium, a blogging platform inspired by Medium. It has a simplistic and minimalist style to allow users to focus on reading and writing blog posts. It features a fully functional text editor that I built from scratch using JavaScript. The editor is designed to be simple and easy to use allowing the user to focus on their writing. Anyone can read posts on Blogium and users can easily create an account to get started writing their own posts.

## Tech

Blogium was created with React, NodeJS, Express, PostgreSQL, and Firebase. It is a Full-Stack web app and you can view the client repo [here](https://github.com/f3ve/Blogium)

## Live app

You can view the live app [here](https://blogium.now.sh/)

## API Documentation

### Auth Endpoints

> ```POST /api/auth/login```

Validates the login credentials against the database and if they are valid returns a JWT

**Sample request Body**

```json
{
  "username": "example",
  "password": "example-password"
}
```

####