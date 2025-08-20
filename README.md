# ✨ Levitation PDF Generator  

🚀 A **full-stack PDF Generator** built with modern technologies.  
This project allows you to generate PDFs dynamically with a sleek UI and a robust backend.  

---

## 📂 Project Structure  

```

levitation/
│── client/             # 🎨 Frontend (React + Vite + TypeScript)
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # App pages
│   ├── services/       # API calls
│   ├── store/          # Global state management
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── global.css      # Styles
│
│── public/             # 🌍 Static assets (SVGs, icons, robots.txt)
│
│── server/             # ⚡ Backend (Node.js + TypeScript + Express)
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── index.ts        # Server entry point
│   └── node-build.ts   # Build scripts
│
│── shared/             # 🔗 Shared code between client & server
│   └── api.ts
│
│── .env                # Environment variables
│── .gitignore          # Ignored files
│── package.json        # Dependencies
│── pnpm-lock.yaml      # Lock file

````

---

## ⚡ Tech Stack  

### 🎨 Frontend  
- ⚛️ **React (TypeScript + Vite)**  
- 🎨 **TailwindCSS** (for styling)  
- 📦 **Shadcn/UI Components**  

### ⚡ Backend  
- 🟢 **Node.js + Express**  
- 🔒 **JWT Authentication**  
- 📄 **PDF Generation Tools**  

### 🔗 Shared  
- ⚡ TypeScript-powered shared utilities  

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/hsmanu1205/levitationPdfGenerator.git
cd levitationPdfGenerator
````

### 2️⃣ Install Dependencies

Using **pnpm** (recommended):

```bash
pnpm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

### 4️⃣ Run the Project

#### ▶️ Start Frontend

```bash
cd client
pnpm dev
```

#### ⚡ Start Backend

```bash
cd server
pnpm dev
```

---

## 📜 Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Run development server   |
| `pnpm build` | Build production bundles |
| `pnpm start` | Start production server  |

---

## 🌟 Features

✅ Generate PDFs dynamically
✅ Full-stack architecture (React + Node.js)
✅ TypeScript everywhere
✅ TailwindCSS + Shadcn UI for modern UI
✅ Easy deployment ready

---

## 🤝 Contributing

Contributions are welcome! 🎉
Feel free to **fork** this repo and submit a **pull request**.

---

## 📄 License

📝 MIT License

---

Made with ❤️ by [Harshit Singh](https://github.com/hsmanu1205)

```

---

👉 This will give your GitHub project a **professional look with emojis and a clear structure**.  

Would you like me to also create a **GitHub Actions workflow (CI/CD)** file for auto-building & testing when you push changes? That’ll make your repo look even more polished.
```
