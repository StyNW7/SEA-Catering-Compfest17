<div align="center">
    <div >
        <img height="150px" src="./img/logo.png" alt=""/>
    </div>
    <div>
            <h3><b>SEA Catering</b></h3>
            <p><i>Healthy Meals, Anytime, Anywhere</i></p>
    </div>      
</div>
<br>
<h1 align="center">SEA Catering - SEA Academy - Compfest 17</h1>
<div align="center">

<img src="./img/banner.png" alt=""/>

</div>
<br>
SEA Catering is a customizable healthy meal service delivering across Indonesia. With rapid growth and increased orders, we developed this web application to streamline ordering, allow meal customization, and enhance delivery logistics. This platform empowers users to subscribe to meal plans, manage orders, and access tailored dashboards for both users and admins.

---

## 📃 Table of Contents
- [Complete Documentation](#-complete-documentation)
- [Technology Stack](#-technology-stack)
- [Core Features](#-core-features)
- [Live Demo](#-live-demo)
- [Account Information](#-account-information)
- [Getting Started Locally](#-getting-started-locally)
- [env Configuration](#-env-configuration)
- [Website Preview](#-website-preview)
- [Satzinger’s Diagram](#-diagram)
- [API Documentation](#-api-documentation)
- [Owner](#-owner)
- [Contact](#-contact)

---

## 📚 Complete Documentation

<ul>
    <li><b>Notion Documentation (Detail Documentation)</b></li>
    <a href="https://stanley-n-wijaya.notion.site/SEA-Catering-Documentation-20f73555b71f8045ae6dff108f41acc6?source=copy_link">SEA Catering Documentation</a>
</ul>


---

## Technology Stack

<div align="center">
<a href="https://nextjs.org/">
<kbd>
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" height="60" />
</kbd>
</a>

<a href="https://www.typescriptlang.org/">
<kbd>
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" height="60" />
</kbd>
</a>

<a href="https://tailwindcss.com/">
<kbd>
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" height="60" />
</kbd>
</a>

<a href="https://ui.shadcn.com/">
<kbd>
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/shadcn_ui.png" height="60" />
</kbd>
</a>

<a href="https://www.postgresql.org/">
<kbd>
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png" height="60" />
</kbd>
</a>

<a href="https://www.prisma.io/">
<kbd>
<img src="./img/tech/prisma.png" height="60" />
</kbd>
</a>

</div>

<div align="center">
<h4>Next JS | Typescript  | TailwindCSS | ShadcnUI | PostgreSQL | Prisma</h4>
</div>

<br>

---

## 🧩 Core Features (based on criteria given)

### ✅ Level 1: Welcome to SEA Catering

* Static homepage introducing SEA Catering
* Add some details information of the website

### ✅ Level 2: Making It Interactive

* Full Responsive Layout
* Meal Plan cards with modals
* Testimonials form + slider
* Static Business Contact Page

### ✅ Level 3: Subscription System

* Custom form with:

  * Name
  * Phone
  * Plan
  * Meal Types
  * Delivery Days
  * Allergies
* Auto price calculation
* Database integration using PostgreSQL & SeaORM

### ✅ Level 4: Securing SEA

* Authentication and Authorization with hashed passwords + Secure Middleware
* Role-based Access (User & Admin)
* Form validations and sanitizations (XSS, SQLi, CSRF)

### ✅ Level 5: User & Admin Dashboard

* Users: View, pause, cancel subscriptions
* Admins: View subscription metrics, MRR, growth

### ✅ BONUS

* Good and Intuitive UI/UX Design
* Deployment
* Clean Code, Clean Project Architecture, Full Responsive, and complete README Documentation + Notion Documentation (for more detail info)

---

## 🚀 Live Demo
Visit the live website demo here:  
👉 https://sea-catering-compfest17.vercel.app/

---

## 👤 Account Information

> [!TIP]
> 
> If you run it locally, just run the seeding (make sure you already setup the Postgres Database and .env file). However, if you use the deployment this is accounts that you can use

#### Admin Account
- **Email**: admin@seacatering.com
- **Password**: Admin@123

#### User/Customer Account
- **Email**: user@example.com
- **Password**: User@123

---

## 🧰 Getting Started Locally

### Prerequisites
- **Node.js** (v14 or higher)
- **PostgreSQL** (configured locally or remotely)
- **PgAdmin** (optional)
- **Git**
- **Postman** (optional)

### Clone (Setup Locaclly)
```bash
git clone https://github.com/StyNW7/SEA-Catering-Compfest17.git
cd sea-catering-compfest17
(Dont forget to do .env configuration first)
(Dont forget to seeding the database optional but very recommended)
npm install -g prisma (Install prisma globally)
npm install
npm run dev
npm run build
```

### Seeding Database
```bash
npx prisma migrate reset
npm run prisma:migrate:dev
```

---

## 🔐 .env Configuration

Default Local Postgres SQL Server Port is: 5432 (But, you can check it manually)
```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=public
SESSION_SECRET=64_character_hex_string_here
```

#### 🫙 PostgreSQL Database Configuration

1. Install PostgreSQL Database
2. Create Database (make sure you already have a server to make a database)
3. Change the DATABASE_URL value based on your PostgreSQL Database Configuration

#### 🫙 Session Secret Configuration

📌 Generate Session Secret Key (helper):

Run this on terminal
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Then copy the string to the SESSION_SECRET value

```
Example:
SESSION_SECRET=6aa80ec2ba7618442b7c11a92c88521b1f1bc182055733702622e561ce12024c
```

#### 🫙 .env.example

📌 You can create these files manually or copy from a provided `.env.example` file (recommended but change it based on your local environment configuration).

---

## 📸 &nbsp;Website Preview
<table style="width:100%; text-align:center">
    <col width="100%">
    <tr>
        <td width="1%" align="center"><img height="370" src="./img/web-preview/home-about.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Home Page | About Section</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/home-founder.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Home Page | Founder Section</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/login.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Login Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/register.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Register Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/menu-page.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Menu Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/testimonial-page.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Testimonial Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/contact-page.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Contact Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/user-dashboard-page.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">User Dashboard Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/web-preview/admin-dashboard-page.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Admin Dashboard Page</td>
    </tr>
</table>

---

## 🧭 Diagram

*Overall Database System Flow:*
<p align="center">
  <img src="./img/SEA-Catering-Diagram.png" width="700">
</p>

This diagram shows how the models connected using ERD Diagram

---

## 🔥 API Documentation

Postman Link:

[SEA-Catering Postman](https://www.postman.com/xstynwx/workspace/sea-catering/collection/35383957-51776816-238c-446f-ab19-03859a146316?action=share&creator=35383957&active-environment=35383957-a553cbd0-f21e-45fc-80ba-3ddfac927058)

> [!TIP]
> 
> To use POST, PUT, DELETE, and PATCH Method. First change the csrf environment secret token using Get-CSRF-Token Request

---

## 👥 Owner

This Repository is created by
<ul>
<li>Stanley Nathanael Wijaya</li>
</ul>
As assignment selection at SEA Academy Compfest 17

---

## 📬 Contact
Have questions or want to collaborate?

- 📧 Email: stanley.n.wijaya7@gmail.com
- 💬 Discord: `stynw7`

<code>Made with ❤️ in the midst of busyness 🧑‍🍳 for SEA Academy - COMPFEST 17</code>