# Welcome to Coffee Diary Backend

### Dependencies (Core)
- BCrypt.js
- Cookie-parse
- CORS
- Express JS
- Express Rate Limit
- Helmet
- JOI
- JsonWebToken (JWT)
- Mongoose
- Morgan
- Nodemon


## Endpoints

#### All endpoints starts with /api/

### Coffee Routes (All requires authentication)

`/coffee/`
- Root of coffee directory


`/coffee/new` `POST`
- For posting new entry

`/coffee/all` `GET`
- For getting all entries under a user_id (_id in mongodb)
- Requires: _id

`/coffee/searchall` `GET`
- For searching all entries. Not used at the moment as it is being done in front end via filtering

`/coffee/deleteEntry` `DELETE`
- For deleting an entry. 
- Requires: entry _id

`/coffee/updateEntry` `PUT`
- For updating entry
- Requires: entry _id and new entry body

### User Routes (Some requires authentication)

`/user/` `GET`
- Root
- Requires authentication

`/user/register` `POST`
- For new user registration
- Requires username and password
- DOES NOT require authentication

`/user/login` `POST`
- For login
- Requires username and password
- DOES NOT require authentication
- Sends back two JWTs (1 cookie, 1 CSRF Token)

`/user/logout` `GET`
- For logout
- Requires active JWT
- DOES NOT require authentication (might change)
- Sends back clearCookie command

`/user/details` `GET`
- Unimplemented
- Currently, returns STATUS 200 and JSON message

`/user/me` `GET`
- Unimplemented
- Returns nothing

`/user/check` `GET`
- For checking valid session
- Like auth but slightly more
- If Authentication JWT valid, sends back CSRF JWT
- If no JWT, or expired JWT, returns 401