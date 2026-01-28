Mini CRM

Simple task-based CRM built with React and TypeScript.

Features

Authentication (client-side)

Roles: admin / user

Task CRUD (admin only)

Task list with:

search

status filter

pagination

Modal for create/edit tasks

Role-based UI restrictions

Tech Stack

React

TypeScript

Vite

Context API

Hooks

ESLint

How to try

Clone the repository

Install dependencies:

npm install


Run the project:

npm run dev


On the login screen:

Login as User — read-only access

Login as Admin — full access (create / edit / delete tasks)

Architecture

Feature-based structure:

entities — business logic and types

features — UI features

app — app setup and providers