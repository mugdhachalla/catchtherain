# Catch the Rain – Rooftop Rainwater Harvesting Assessment

An interactive web app that helps individuals and communities quickly **assess the feasibility, structures, and benefits of rooftop rainwater harvesting (RTRWH)**.  
Built for **Smart India Hackathon 2025** by Team Cloud 6. 

---

##  Problem Statement
Groundwater replenishment is critical for sustainable water resources.  
While manuals and guidelines exist from the **Central Ground Water Board (CGWB)**, they are **technical and not user-friendly**.  
There is no simple digital tool where citizens can check:
- How much rainwater they can harvest  
- What recharge structure is suitable  
- What cost/benefit they can expect  

---

## Our Solution
We developed a **web application** that:
- Accepts simple inputs: location, roof area, open space, dwellers  
- Provides **instant outputs**:
  - Feasibility check  
  - Suggested recharge structures (pits, trenches, shafts, tanks)  
  - Estimated harvested water volume  
  - Local rainfall and groundwater info  
  - Cost estimation & payback period  
  - Artifical Recharge Potential
- Generates a **PDF report**  

---

## Key Features
-  **KPI Cards** – Annual harvest, cost, payback, recharge potential  
-  **Charts** – Monthly harvest distribution  
-  **Guidelines & Glossary** – Easy understanding of RWH terms  
-  **Geolocation + Rainfall Data** – Auto-fill city/rainfall  
-  **Downloadable Reports** – One-click PDF export  
-  **Mandates Info** – City/state-specific RWH rules shown with info icon  
-  **Future: Dashboard** – Government view to monitor adoption & impact  
-  **Future: Regional Languages** – Inclusivity and accessibility  
-  **Future: Satellite View Auto-fill** – Auto-detect roof area & open space  
-  **Future: Marketplace Integration** – One-click connect to verified contractors with pre-filled requirements 
-  **Future: WhatsApp Chatbot** – By integrating ChatGPT API or LLMS the bot can understand natural language 
  and respond in regional languages  

---

##  Tech Stack
- **Frontend:** React + Vite + Tailwind CSS  
- **State Management:** Zustand  
- **Forms & Validation:** React Hook Form  
- **Charts:** Recharts  
- **PDF Export:** html2pdf.js 
- **Icons:** Lucide React  
- **Backend (Planned):** Node.js + Express + PostgreSQL (for persistence, analytics, contractor integration)  
- **APIs/Data (Planned):**  
  - CGWB datasets (aquifers, groundwater)  
  - OpenWeather API (rainfall)  
  - GIS/Maps API (future roof area auto-detection)  
  - WhatsApp API (for chatbot) 
- **Netlify** → Frontend deployment  
- Git + GitHub → Version control  

---
## Future Enhancements

- Satellite/GIS integration to auto-detect roof & open space

- Integration with marketplaces for one-click contractor booking

- Gamified rewards & incentives for citizens who implement RWH

- WhatsApp Chatbot with Sarvam AI Integration

- Government Dashboard: City/district-wise adoption, verified implementations, KPIs, and compliance tracking.  

## Project Structure
```bash
rtrwh/
│
├── src/
│ ├── components/ # Reusable UI components (Navbar, KPI, Charts, Cards)
│ ├── pages/ # Pages (Home, AssessForm, Results, Dashboard, Guidelines)
│ ├── store/ # Zustand state management
│ ├── data/ # Rainfall + Rules JSON datasets
│ ├── lib/ # Formulas and Calculations
│ └── App.jsx # Main routes
│
├── public/ # Static assets (logos, images, icons)
├── index.html # Main HTML entry point
├── tailwind.config.js # TailwindCSS configuration
├── postcss.config.cjs # PostCSS configuration
└── package.json # Project metadata & dependencies
```

## Getting Started

### 1. Clone repo
```bash
git clone https://github.com/mugdhachalla/catchtherain.git
cd catchtherain
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


## View Demo
### Follow the link below to view the web app-hosted on Netlify
https://catchtherain.netlify.app/
