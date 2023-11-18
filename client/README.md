----2

- npm i react-router-dom axios antd @reduxjs/toolkit react-redux react-spinners moment
- set routes in app.js
- import antd in index.js

----4

- complete signup and login functionalities
  ---- 6
- send token from client from Home.js
  ---- 7
- setup redux toolkit and install neccessary packages
- create alertSlice and configure it in store and connect store with app in index.js
- apply show and hide loaderstate in login signup page ,,,, create Spinner.js and call it in App.js
  ----- 8
- create protectedRoutes.js and publicRoute.js
- protect routes on basis of login ,, use protectedRoutes and publicRoute in App.js
  ----- 9
- create layout.jsx and set basic layout
- create Data folder to create menu item

---- 10

- create user slice ,, getUser in protected Route and store it in store ,
- use user in Layout.jsx
  ----- 12
- create new data in data.js for admin
- create logout functionality in Layout.jsx and display ide menu user accordingly
  --- 14
- create form for Apply doctor
  --- 16
- connect dotor apply form with api in applyDoctorForm.js
- use badge two display notification in Layout.jsx
  --- 18
- create notification page and connect with api
  --- 20
  complete delete all notification functionality
  --- 21
  create admin pages
  --- 23
  display user and doctors lists .
  --- 25
- working on approved btn
  --- 26
  - create doctor profile ,,, update the layout.jsx
    --- 28
- fetch doctor data

--- 30

- display doctor data in profile page and update it
- use moment library to tackle date.locale problem
  --- 32
- create new component docor list
- display all doctors in homepage
- create booking page and its route ,,,, when user click on doctor card it edirect to booking page
--- 34 
- design booking page and display doctor detail in it
--- 35
- use appoinment Model in book appointment
--- 37
- work to check  appointment availability 
--- 39
- create new page for user appointments 
--- 41 
- create new page for  doctor appointments
--- 43
- work on status updated function