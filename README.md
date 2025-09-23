# 🌧️ Catch the Rain – Rooftop Rainwater Harvesting Calculator

An interactive web app that helps individuals and communities quickly **assess the feasibility, structures, and benefits of rooftop rainwater harvesting (RTRWH)**.  
Built for **Smart India Hackathon 2025** by Team Cloud 6. 🚀  

---

## 📌 Problem Statement
Groundwater replenishment is critical for sustainable water resources.  
While manuals and guidelines exist from the **Central Ground Water Board (CGWB)**, they are **technical and not user-friendly**.  
There is no simple digital tool where citizens can check:
- How much rainwater they can harvest  
- What recharge structure is suitable  
- What cost/benefit they can expect  

---

## 💡 Our Solution
We developed a **web application** that:
- Accepts simple inputs: location, roof area, open space, dwellers  
- Provides **instant outputs**:
  - Feasibility check  
  - Suggested recharge structures (pits, trenches, shafts, tanks)  
  - Estimated harvested water volume  
  - Local rainfall and groundwater info  
  - Cost estimation & payback period  
- Generates a **PDF report**  
- Accessible via **web + WhatsApp integration**  

---

## ✨ Key Features
- 📊 **KPI Cards** – Annual harvest, cost, payback, recharge potential  
- 📉 **Charts** – Monthly harvest distribution  
- 📖 **Guidelines & Glossary** – Easy understanding of RWH terms  
- 📍 **Geolocation + Rainfall Data** – Auto-fill city/rainfall  
- 📥 **Downloadable Reports** – One-click PDF export  
- 🌐 **Regional Languages (future)** – Inclusivity and accessibility  
- 🛰️ **Future: Satellite View Auto-fill** – Auto-detect roof area & open space  
- 🔗 **Future: Marketplace Integration (UrbanClap/Urban Company)** – One-click connect to verified contractors with pre-filled requirements  

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite + Tailwind CSS  
- **State Management:** Zustand  
- **Forms & Validation:** React Hook Form  
- **Charts:** Recharts  
- **PDF Export:** html2pdf.js (moving to react-to-print option)  
- **Icons:** Lucide React  
- **Backend (Planned):** Node.js + Express + PostgreSQL (for persistence, analytics, contractor integration)  
- **APIs/Data:**  
  - CGWB datasets (aquifers, groundwater)  
  - OpenWeather API (rainfall)  
  - GIS/Maps API (future roof area auto-detection)  

---

## 🚀 Getting Started

### 1. Clone repo
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```
### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
App runs on http://localhost:5173

### 4. Build for production
```bash
npm run build
```
The build output is in /dist.

## Future Enhancements

- Satellite/GIS integration to auto-detect roof & open space

- Integration with UrbanClap/Urban Company for one-click contractor booking

- Gamified rewards & incentives for citizens who implement RWH

- WhatsApp Chatbot with LLM 