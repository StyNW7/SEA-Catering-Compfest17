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

## Technology Stack

<div align="center">
<a href="https://react.dev/">
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

<a href="https://tailwindcss.com/">
<kbd>
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png" height="60" />
</kbd>
</a>

<a href="https://ui.shadcn.com/">
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

## 📃 Table of Contents
- [Complete Documentation](#📚-complete-documentation)
- [Introduction](#🌟-introduction)
- [Technology Stack](#🛠️-technology-stack)
- [Core Features](#🧩-core-features)
- [Live Demo](#🚀-live-demo)
- [Getting Started Locally](#🧰-getting-started-locally)
- [env Configuration](#🔐-env-configuration)
- [Screenshots](#🖼️-website-preview)
- [Satzinger’s Diagram](#🧭-diagram)
- [API Documentation](#🔥-api-documentation)
- [Owner](#👥-owner)
- [Contact](#📬-contact)

---

## 📚 Complete Documentation

<ul>
    <li><b>Notion Documentation (Detail Documentation)</b></li>
    <a href="https://stanley-n-wijaya.notion.site/YoshiKoya-Documentation-1ce73555b71f80cba760c2efe8d4a3ef?pvs=4">YoshiKoya Documentation</a>
</ul>


---


## 🌟 Introduction
**YoshiKoya** is an innovative desktop app to help restaurant owners and staff efficiently manage menus, transactions, deliveries, reservations, and employee roles through a seamless UI powered by modern technologies.

> "Bringing seamless restaurant management with a modern tech stack for efficiency and growth."

---

## 🛠️ Technology Stack
- **Frontend**: React with Vite, TypeScript, TailwindCSS, ShadcnUI components
- **Backend**: Rust + Tauri, SeaORM, and sqlx
- **Database**: PostgreSQL
- **Caching**: Redis for performance optimization
- **API**: GraphQL integration for employee and branch synchronization (https://yoshikoya.vercel.app/api/graphql)
- **Build Tools**: Cargo (Rust), NPM/Yarn (Node.js)

---

## 🧩 Core Features

- 🍽️ **Menu Management** — CRUD for menu items with ingredients and branch association.
- 🧾 **Transaction Handling** — Manage dine-in and delivery orders using World Real Map (Leaftlet) with voucher discounts.
- 🛵 **Delivery Management** — Assign delivery personnel based on active queue and track deliveries.
- 🏢 **Branch & Restaurant Management** — Open/close branches, track restaurant details and locations.
- 📅 **Table Reservations & Waiting List** — Manual and automatic table assignments, with waitlist notifications.
- 👥 **Role-Based Access Control** — Different user roles (in total 13 roles) for example CEO, HR, Chef, Waiter, Cashier with permissions.
- 🔐 **Authentication & Authorization** — JWT-based login system with Redis cache for session management.
- 📢 **Notification System** — Real-time user notifications for reservations, orders, and system updates.

---

## 🚀 Live Demo
Visit the live desktop app demo here:  
👉 [Coming Soon](Coming Soon)

---

## 🧰 Getting Started Locally

### Prerequisites
- **Node.js** (v14 or higher)
- **Rust** (v1.50 or higher)
- **Tauri CLI** (`cargo install tauri-cli`)
- **PostgreSQL** (configured locally or remotely)
- **Redis Server** (but you can use Docker or WSL)
- **Docker or WSL**
- **Git**

### Clone (Setup Locaclly)
```bash
git clone https://github.com/StyNW7/TPA-YoshiKoya.git
cd TPA-YoshiKoya
npm install
npm run tauri dev
```

### Start and Stop Docker
```bash
docker start redis-stack-server
docker stop redis-stack-server
```

---

## 🔐 .env Configuration

Default Postgres SQL Server Port is: 5432 (But, you can check it manually)
Default Redis Server Port is: 6379
```
DATABASE_URL=postgres://username:password@localhost:5432/database_name
REDIS_URL=redis://127.0.0.1:6379
```

📌 You can create these files manually or copy from a provided `.env.example` file (recommended).

---

## 📸 &nbsp;Website Preview
<table style="width:100%; text-align:center">
    <col width="100%">
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/home1.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Home Page 1</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/home2.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Home Page 2</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/login.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Login Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/register.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Register Page</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/dashboard.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Dashboard</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/courses.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Courses</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/business.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Businesses</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/profile.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Profile</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/addCourse.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Add Course</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/courseDetail.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Detail Course</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/hiring.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Hiring List</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img height="400" src="./img/demo/setup.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Setup Profile</td>
    </tr>
</table>

---

## 🧭 Diagram

*Overall Database System Flow:*
<p align="center">
  <img src="./YoshiKoya-Diagrams/Diagram-Images/Rev-1-Phase/Class Diagram.png" width="700">
</p>

This diagram shows how the models connected using ERD Diagram

---

## 🔥 API Documentation

Postman Link:

https://www.postman.com/xstynwx/sea-catering/collection/x1jzsah/users?action=share&creator=35383957

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

<code>FUNFACT made with love in the midst of busyness ❤️‍🔥 </code>