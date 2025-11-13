 Bertie’s Books

A simple Node.js and Express web application for browsing books, searching titles, and showing weekly bargains.

Overview

Bertie’s Books is a small web app built as part of a Goldsmiths lab task.
The application displays:

A Home page

A Books list

A Search page (search by title)

A Bargain of the Week

Static HTML pages

Dynamic pages rendered with EJS templates

The backend handles routing and data serving, while the frontend uses clean HTML/CSS with EJS for templating.
🛠️ Technologies Used
1. Node.js

The JavaScript runtime used to run the backend server.
It allows us to build the app using server-side JavaScript.

2. Express.js

A lightweight Node.js framework used for:

Creating routes (/, /books, /search)

Serving static files

Handling GET requests

Rendering EJS templates

It simplifies building servers without manually writing HTTP handling code.

3. EJS (Embedded JavaScript Templates)

EJS is used as the view engine of the project.
It lets us:

Use dynamic values in HTML pages

Loop through book lists

Render search results

Pass data from Express into templates
4. HTML & CSS

Used to structure and style all static and dynamic pages.
Your app includes:

home.html

books.ejs

search.ejs


bargain.ejs
…all styled with basic CSS.

5. Forever (PM2 alternative on VM)

Used on the Goldsmiths Linux VM to keep the Node server running in the background.
