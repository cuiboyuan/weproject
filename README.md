# App Name: WeProject

## How to start
- Install all the dependencies: `npm run setup`
- Build and run at the localhost PORT=5000: `npm run build-run`
- Login Credential `username:password`
    - user: `user:user`
    - admin: `admin:admin`

## Deployed Website Link

http://we-project.herokuapp.com/

## Third party libraries:
- React
- React Router Dom
- React uuid (creating unique id for new objects)
- react-dropzone (image upload)
- Ant Design (Avatar, Icons)
- React Bootstrap (SimpleCard, SimpleList)

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
    - description
    - number of views/team membesr/likes
- Teammate Browsing
    - User info
    - Connect with users
- Project Details
- Teammate Details
- Admin Previliges (In progress)

## Server Routes

### User Routes

- GET "/api/user/:username"
- GET "/api/users"
- POST "/api/newUser"
- DELETE "/api/deleteUser/:username"
- PATCH "/api/updateProfile"
- PATCH "/connections/reply/:username"
- POST "/connections/request/:username"
- DELETE "/connections/remove/:username"

## User Cases
- **project browsing** page (see the pricture below for detailed reference)
  - search bar: you could search project by name
  - project card: detailed info about the project, you could press the card to see the detail.

  - admin functionality of the page: <img src="misc/admin_functionality_project_browsing.png" width="300" style="float:right"/>

    - stick/unstick a specific project to the top
    - delete a project 

![project browsing page detail](misc/project_browsing_readme.png)

 
  
  - **Teammate Browsing** page
    - similar layout, admin functionality. See project browsing page for reference.
  
  - **User Profile** page
 
    - After logging in, access the profile page through 'My profile' tab on the upper right corner
    <img width="994" alt="profile" src="https://user-images.githubusercontent.com/41752876/110662020-1d7f7500-8193-11eb-94c7-87d7cbece67a.PNG">

    - Click 'Edit Profile' button to change profile information: self introduction, add/remove skills, update social media information, add/remove experiences, etc.
      <img width="905" alt="prof detail" src="https://user-images.githubusercontent.com/41752876/110662140-37b95300-8193-11eb-88e5-55eb5ae4d9b3.PNG">
    
      <img width="916" alt="my proj" src="https://user-images.githubusercontent.com/41752876/110663358-566c1980-8194-11eb-97b6-5c46d5f0c507.PNG">
   
      <img width="938" alt="exp" src="https://user-images.githubusercontent.com/41752876/110662303-5e778980-8193-11eb-801e-53ae7120d34f.PNG">
    
    - Click on 'Save Changes' button to save changes
      <img width="915" alt="edit detail" src="https://user-images.githubusercontent.com/41752876/110662163-3f78f780-8193-11eb-85f5-49e36e1ba60e.PNG">
    
      <img width="907" alt="edit exp" src="https://user-images.githubusercontent.com/41752876/110662201-46a00580-8193-11eb-82bb-e0de9a1d5381.PNG">
    
  - **User Detail** page
    - After logging in, access user detail page by clicking on the card in the teammate browsing page
    - Similar to profile page, but there is no 'Edit Profile' button
    - If logged in as admin, there will be a delete button, which will remove the user permanently.
   
    <img width="892" alt="admin" src="https://user-images.githubusercontent.com/41752876/110662359-6cc5a580-8193-11eb-946b-1c2668db7148.PNG">

  - **Create Project**
    - click the `creat new project` under the user avatar

    <img width="300" alt="create-project" src="misc/create-project.png">

    - fill all the fields in the `create project page`, and then press `CREATE`

    <img width="800" alt="new-project" src="misc/new-project.png">

  - **Project Detail**
    - owner can upload project image by "drag and drop"

    <img width="600" alt="upload" src="misc/upload.png">
    <img width="600" alt="display" src="misc/display.png">

    - owner can remove members or applicants under `Team` or `Manage` tab

    <img width="600" alt="team" src="misc/team.png">
    <img width="600" alt="manage" src="misc/manage.png">

    - owner can also manage the progress with `proceed` or `withdral`

    <img width="600" alt="progress" src="misc/progress.png">
    

