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
- MongoDB Atlas (backend data)
- Cloudinay (backeng image upload)

## Current Features
- Header
    - Router
    - User logout
- Login
    - Sign In/Sign up
    - Login as admin
- Project Browsing
    - title
    - owner avatar, username
    - description
    - number of views/team membesr/likes
- User
    - profile update
    - upload avatar
- Teammate Browsing
    - User info
    - Connect with users
- Project Details
    - images upload
    - manage teammates
    - current progress
- Teammate Details
    - Connect other users
    - Edit profile info
- Admin Previliges 
    - Delete user/project
## Server Routes
- GET ```/api/check-session```:
  - if the user is currently loggedin, returns status code 200 and a object of 
    ```
    {
      userName: <the current user name>
      isAdmin: <if the current logged in user is admin user>
    }
    ```
  - If no user is logged in, return status code 401


### User Routes

- GET ```/api/user/:username```
  - Return the user object with userName of parameter "username"; no request body required.
- GET ```/api/users```
  - Return the all user objects in the database; no request body required.
- GET ```/api/top/:username```
  - Request to top the user with the given **username**
  - Returns status code 200 on success and 404 on failure

- GET ```/api/logout```
  - Request to logout the user's account. The request will destroy the created session
  - Returns status code 200 on success and 500 on error
    
- POST ```/api/login``` 
  - The login request. Request body is of form:
    ```
    {
      userName: <the username>,
      password: <the password of that user>
    }
    ```
  - If the userName and password matches, returns the logged in user object (we store each user as an object in the database) and create a session coockie storing the following three attributes of that user object: ```isAdmin, userName, _id```
  - If the userName and password doesn't match, return status code 400

- POST ```/api/newUser```
  - The request for registration. The request body is of the form:
    ```
      {
        userName: <The username of this new user, UNIQUE>
        password: <The user's password>
        isAdmin: <if it is an admin user>
      }
  - Returns the created User object on success and status code 400 on failure.
- DELETE ```/api/deleteUser/:username```
   - The route deletes the user with userName of parameter username; no request body required
   - The route will only execute successfully if the currently logged in user is an admin
   
- PATCH ```/api/updateProfile```
   - The route updates the basic user info of the currently logged in user
   - The request body contains updated information, and it should be a JSON document formatted as below:
    ```
    {

        "description": "user description",

        "skills": ["skill1", ""skill2",... ],

        "experiences":[{

            "company":"company 1",

            "position": "title 1",

            "start": "2018-09-01",

            "end": "2022-05-01"

        }, ... ],

        "email": <user email address>,

        "linkedin": <user linkedin link>,

        "github": <user github link>,

    }
    ```
  - On success, the user will update its corresponding information in the request body, and the updated user object will be returned

- POST ```/connections/request/:username```
  - The request to add the current logged in user to the ```pending``` list of the user with the given **username**; i.e., login user sends a friend request to another user.
  - On success, the route will return the user object with the updated pending list.
- PATCH ```/connections/reply/:username```
  - The request takes in a request body of type JSON with only one attribute:
  ```
  {
    "accept": <boolean representing whether the user accepts the friend request>
  }
  ```
  - If ```accept``` is false, we will just remove the given **username** from the pending list of the login user (user rejects the friend request); else, we will move **username** from pending list to the connection list (user accepts the friend request).
- DELETE ```/connections/remove/:username```
   - The request to remove **username** from the ```connection``` list of the current login user. The userName of the login user will also be removed from the ```connections``` list of the user with **username**. No request body is required

## Project Routes
  - GET ```/api/project/top/:projectID```
    - The request from admin to top a particular project by their projectID (the _id attribute)
    - returns status code 200 on success and 404 on failure
  - POST ```/api/project/like```
    - The request from users to like a particular project
    - The request body is in the following format:
      ```
      {
        userName:<the username of the user who likes the project>
        project_ID: <the _id attribute of the liked project object>
      }
      ```
    - Returns status code 200 on success and 404 on failure
  - GET ```/api/projects```
    - Fetch all projects
    - 200 on success, 500 on failure
```
    {
        "name": "Project",
        "description": "Project",
    }
```
  - POST ```/api/project```
    - Add a new project
    - Please pass the above JSON object to the request body for testing
    - 200 on success, 500 on failure
  - DELETE ```/api/project/:id```
    - Delete an existing project
    - Please pass an project id `_id` returned by DB to route url.
    - 200 on success, 404 on id not found, 500 on other failures
```
{
        "requirement": "No requirement",
        "userIds": [],
        "status": "incomplete",
        "usersLiked": [],
        "tags": [],
        "topped": false,
        "images": [],
        "id": "17f3777-54a0-2b7-47d0-5054a0fe044",
        "name": "Project",
        "description": "Project",
    }
```
  - PATCH ```/api/project/:id```
    - Update an existing project
    - Please pass an project id `_id` returned by DB to route url.
    - Please pass the above JSON object to the request body for testing
    - 200 on success, 404 on id not found, 500 on other failures
  - POST ```/api/project/:id/images```
    - Add images to a project
    - Please pass an project id `_id` returned by DB to route url.
    - Please pass an image file to the form-data with field `file`.
    - 200 on success, 404 on id not found, 500 on other failures
  - GET ```/api/project/:id/images```
    - Fetch project image.
    - Please pass an project id `_id` returned by DB to route url.
    - Please pass an image file to the form-data with field `file`.
    - 200 on success, 404 on id not found, 500 on other failures
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
    

