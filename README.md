# OIMS 🚀

## Project Overview
OIMS is a full-stack employee information system designed for organizations. It enables secure authentication, role-based access control, and centralized employee data management. Built using **AngularJS, Tailwind CSS, Express.js, and MongoDB**, this project ensures seamless user experience and efficient data handling.

## 🛠 Tech Stack
- **Frontend:** AngularJS, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT-based authentication

## 🔑 Features
✅ User Registration, Login, Logout, Password reset via email (JWT authentication)  
✅ Profile Management (Users can edit their own info)  
✅ Admin Dashboard (View all employees, manage roles)  
✅ Role-Based Access Control (Admins can manage user data)  
✅ Secure Routing & Guards (Restrict access based on roles)  
✅ MongoDB Integration (CRUD operations for employee data)  

## 📷 Project Screenshots
- 🔑 Landing page
![Landing page]()
- 🏠 Login & Registration 
![login]()
![registration]()
![reset password]() 
- 📤 User profile  
![user profile]()
![edit profile]()
- 👨‍💼 Create post  
![create post]()
- 📌 Admin Dashboard  
![admin dashboard]()

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/TouhidulHaider/OIMS.git
cd OIMS
```
- Backend
```sh
cd api
npm start
```

- Frontend
```sh
cd frontend
ng serve
```

## 🏗 Project Structure
- Frontend
└── 📁frontend
    └── 📁.angular
    └── 📁public
        └── favicon.ico
        └── icon.png
        └── 📁images
            └── oims-bg.png
    └── 📁src
        └── 📁app
            └── api.urls.ts
            └── app.component.css
            └── app.component.html
            └── app.component.spec.ts
            └── app.component.ts
            └── app.config.ts
            └── app.module.ts
            └── app.routes.ts
            └── 📁components
                └── 📁admin
                    └── admin.component.html
                    └── admin.component.ts
                    └── 📁dashboard
                        └── dashboard.component.css
                        └── dashboard.component.html
                        └── dashboard.component.spec.ts
                        └── dashboard.component.ts
                └── 📁auth
                    └── 📁forget-password
                        └── forget-password.component.css
                        └── forget-password.component.html
                        └── forget-password.component.spec.ts
                        └── forget-password.component.ts
                    └── 📁login
                        └── login.component.css
                        └── login.component.html
                        └── login.component.spec.ts
                        └── login.component.ts
                    └── 📁register
                        └── register.component.css
                        └── register.component.html
                        └── register.component.spec.ts
                        └── register.component.ts
                    └── 📁reset
                        └── reset.component.css
                        └── reset.component.html
                        └── reset.component.spec.ts
                        └── reset.component.ts
                └── 📁home
                    └── home.component.css
                    └── home.component.html
                    └── home.component.spec.ts
                    └── home.component.ts
                └── 📁posts
                    └── 📁create-post
                        └── create-post.component.html
                        └── create-post.component.ts
                └── 📁shared
                    └── 📁leaders
                        └── leaders.component.html
                        └── leaders.component.ts
                    └── 📁values
                        └── values.component.html
                        └── values.component.ts
                └── 📁unauthorized
                    └── unauthorized.component.ts
                └── 📁user-profile
                    └── 📁edit-profile
                        └── edit-profile.component.html
                        └── edit-profile.component.ts
                    └── user-profile.component.css
                    └── user-profile.component.html
                    └── user-profile.component.spec.ts
                    └── user-profile.component.ts
            └── 📁core
                └── 📁guards
                    └── auth.guard.ts
                    └── logged-in.guard.ts
                └── 📁services
                    └── auth.service.spec.ts
                    └── auth.service.ts
                    └── role.service.ts
            └── 📁validators
                └── confirmpassword.validator.ts
                └── email.validator.ts
        └── 📁environments
            └── environment.ts
        └── index.html
        └── main.ts
        └── styles.css
    └── .editorconfig
    └── .gitignore
    └── .postcssrc.json
    └── angular.json
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.spec.json

- Backend
└── 📁api
    └── 📁controllers
        └── auth.controller.js
        └── role.controller.js
        └── user.controller.js
    └── 📁models
        └── Role.js
        └── Session.js
        └── User.js
        └── UserTokens.js
    └── 📁routes
        └── auth.js
        └── role.js
        └── user.js
    └── 📁uploads
    └── 📁utils
        └── error.js
        └── response.js
        └── success.js
        └── verifyToken.js
    └── .env
    └── index.js
    └── package-lock.json
    └── package.json