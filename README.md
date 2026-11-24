# Smart Waste Bin Monitoring System (100% Software-Based)

> **Tagline:** Monitor Waste. Manage Collections. Keep Cities Clean.
> **Project Type:** 100% Software-Based Mini Project (College Viva Ready)

---

## 📌 Project Overview

The **Smart Waste Bin Monitoring System** is a modern, software-only web platform built to digitally monitor waste bins, track simulated fill levels, manage collection task workflows, generate real-time alerts, and analyze waste-generation patterns across city areas.

### 🚫 NO HARDWARE REQUIRED
This application is **100% software-based**. It requires:
* NO physical sensors (load cells, ultrasonic, temperature)
* NO ESP32 / Arduino / Microcontrollers
* NO physical waste bins / IoT hardware

All waste-bin data is generated, updated, and managed digitally using the built-in **Smart Bin Simulation Engine**.

---

## 🚀 How to Run the Application

You can launch the application in **two very easy ways**:

### Option 1: Direct Browser Launch (Easiest)
1. Open the project folder `smart-bin-monitoring`.
2. Double-click **`index.html`**.
3. The web application will instantly open in your default browser (Chrome, Edge, Firefox, Brave).

### Option 2: Python Local Server
1. Open PowerShell / Command Prompt inside the `smart-bin-monitoring` folder.
2. Run the command:
   ```bash
   python server.py
   ```
3. The application will automatically open in your browser at `http://localhost:8000`.

---

## 🔑 Demo Account Credentials

Use the single-click preset buttons on the Login page or log in using:

* **Admin Role:**
  * **Email:** `admin@smartbin.com`
  * **Password:** `password123`
  * *Access:* Full CRUD for bins, thresholds, simulation engine, user management, reports.

* **Collection Staff Role:**
  * **Email:** `staff1@smartbin.com`
  * **Password:** `password123`
  * *Access:* View assigned collection tasks, update task status (Pending -> Assigned -> In Progress -> Completed), mark collection complete (resets bin fill level to 8%).

* **Viewer Role:**
  * **Email:** `viewer@smartbin.com`
  * **Password:** `password123`
  * *Access:* Read-only access to Dashboard, Live Monitoring, Leaflet Map, Alerts, Analytics.

---

## 🌟 Key Software Features

1. **Smart Bin Simulation Engine**:
   * Auto-tick simulation that increases waste fill levels over time.
   * Controls: **Start**, **Pause**, **Reset Bins**, **Speed Selector** (Slow, Normal, Fast), and **Random Variation**.
   * **Manual Slider Control** on every bin for live demonstration.

2. **Dynamic Fill-Level Logic & Thresholds**:
   * `0–20%`: **Empty** (Gray)
   * `21–40%`: **Low** (Green)
   * `41–60%`: **Medium** (Yellow)
   * `61–80%`: **High** (Orange)
   * `81–95%`: **Critical** (Red)
   * `96–100%`: **Overflowing** (Purple / Animated Pulse)
   * *Thresholds can be adjusted dynamically in Settings.*

3. **Interactive Leaflet Map View**:
   * Displays 20 initial digital bins across realistic city coordinates.
   * Custom colored pin markers based on current status.
   * Interactive popups with fill progress meters and 1-click **Create Task** button.

4. **Collection Workflow & Automatic Reset**:
   * Task Lifecycle: `Pending` &rarr; `Assigned` &rarr; `In Progress` &rarr; `Completed`.
   * Completing a task automatically resets the bin's fill level to **8%**, updates the last collection timestamp, logs the collected waste weight (kg), and records an entry in Collection History.

5. **Waste Fill Prediction Engine**:
   * Estimates hours and minutes remaining before a bin reaches the **Critical** threshold (81%).

6. **College Viva Demo Wizard ("Run Smart Monitoring Demo")**:
   * An 8-stage interactive guided presentation scenario built specifically for college viva examiners to demonstrate the complete system workflow step-by-step.

7. **Reports & Analytics**:
   * Export bin reports to **CSV**.
   * Formatted **Printable HTML view**.
   * Area-wise waste generation matrix.

---

## 🎓 Viva Presentation Flow (Recommended)

1. **Log in** as Admin.
2. **Dashboard**: Show the real-time KPI counter cards, critical bins table, and smart system insights banner.
3. **Live Monitoring**: Click **"Start Simulation"** to show fill levels increasing dynamically.
4. **Viva Demo Mode**: Click **"Run Smart Monitoring Demo"** in the top bar to execute the step-by-step 8-stage presentation wizard for your examiner.
5. **Collection Workflow**: Show a bin crossing 81%, auto-generating a task, starting collection, and resetting fill to 8%.
6. **Map View**: Demonstrate the interactive Leaflet map with custom colored pin markers.
7. **Reports & Analytics**: Generate a report and show CSV export / Print preview.
