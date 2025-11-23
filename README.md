# 🧠 AI Resume Builder

A powerful **AI-driven resume building web application** that helps users instantly generate professional resumes, customize them live, choose themes, download as PDF, and even share online links — all in one seamless experience.

This full‑stack project is built with **React + Vite**, **Tailwind CSS**, **ShadCN UI**, and a **Strapi v5 backend** powered by **SQLite**. AI capabilities are integrated using **Google Generative AI APIs**.

---

## 🚀 Key Features

### ✨ **AI‑Powered Resume Generation**

Generate complete, professional-quality resumes based on user inputs using **Google GenAI**.

### 🎨 **Live Resume Editor**

Real-time editing panel to modify text, structure, and content instantly.

### 🌈 **Theme Customization**

Choose from multiple elegant color themes to personalize the resume.

### 📄 **One‑Click PDF Download**

Export resumes as clean, formatting-perfect PDFs.

### 🔗 **Shareable Resume Links**

Publish your resume online and share using auto-generated links.

### 🚄 **Lightning Fast Deployment**

* **Frontend:** Vercel
* **Backend:** Render

---

## 🛠️ Tech Stack

### **Frontend**

* React (Vite)
* Tailwind CSS
* ShadCN UI

### **Backend**

* Strapi v5 CMS
* SQLite (default Strapi DB)

### **AI Integration**

* Google Generative AI APIs

### **Hosting**

* Vercel (Frontend)
* Render (Backend)

---

## 📽️ Demo Video

**Watch the full demo:**
[https://go.screenpal.com/watch/cTf0qpnjNqR](https://go.screenpal.com/watch/cTf0qpnjNqR)

---

## 📁 Project Structure

```
ai-resume-builder/
│
├── frontend/            # React + Vite + Tailwind + ShadCN
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── ...
│
└── backend/             # Strapi v5 CMS
    ├── src/
    ├── extensions/
    └── database.sqlite
```

---

## ⚙️ Setup Instructions

### **1️⃣ Clone the Repository**

```
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

### **2️⃣ Install Frontend Dependencies**

```
cd frontend
npm install
npm run dev
```

### **3️⃣ Setup Backend (Strapi v5)**

```
cd backend
npm install
npm run develop
```

> Strapi will initialize SQLite DB automatically.

### **4️⃣ Add Google GenAI Keys**

Create a `.env` file in the frontend:

```
VITE_GOOGLE_API_KEY=your_api_key
```

---

## 🚀 Deployment

Frontend and backend are deployed using:

* **Vercel** for blazing fast frontend hosting
* **Render** for scalable backend deployment

---

## 📌 Future Enhancements

* Resume templates gallery
* AI‑powered job‑specific resume adaptation
* Drag-and-drop section builder
* Multi-language resume generation

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues for feature requests or bug reports.

---

## 📜 License

MIT License

---

## ⭐ Acknowledgements

* Google Generative AI
* Strapi Team
* Vercel & Render
* ShadCN UI Community

---

## 💡 Summary

**AI Resume Builder** is an intuitive full‑stack application that makes resume creation seamless, smart, and fast. Whether you're a student or a professional, this tool lets you build impressive resumes with AI‑powered efficiency.

---
