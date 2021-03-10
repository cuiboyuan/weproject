# App Name: WeProject

## How to start
- Install all the dependencies: `npm i`
- Build and run at the localhost PORT=3000: `npm start`
- Login Credential `username:password`
    - user: `user:user`
    - admin: `admin:admin`

## Third party libraries:
- React
- React Router Dom
- Ant Design (Avatar, Icons)
- React Bootstrap (Card)

## Current Features
- Header
    - Router
    - User logour
- Login
    - Sign In/Sign up
    - Login as admin
- Project Browsing
    - title
    - owner avatar, username
    - descrption
    - number of views/team membesr/likes
- Teammate Browsing
    - User info
    - Connect with users
- Project Details
- Teammate Details
- Admin Previliges (In progress)

## User Cases
- **project browsing** page (see the pricture below for detailed reference)
  - search bar: you could search project by name
  - project card: detailed info about the project, you could press the card to see the detail.

  - admin functionality of the page: <img src="./admin_functionality_project_browsing.png" width="300" style="float:right"/>

    - stick/unstick a specific project to the top
    - delete a project 

![project browsing page detail](project_browsing_readme.png)

 
  
  - **Teammate Browsing** page
    - similar layout, admin functionality. See project browsing page for reference.