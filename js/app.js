/* Smart Waste Bin Monitoring System - 100% Software-Based */
const { useState, useEffect, useRef, useMemo } = React;

// Icon Component rendering clean inline SVG icons based on icon name
const Icon = ({ name, className = "w-5 h-5", style = {} }) => {
  const icons = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    activity: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    bins: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    map: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    truck: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />,
    analytics: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    reports: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    profile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
    play: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />,
    pause: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />,
    reset: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
    zap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
    checkCircle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    alertTriangle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    alertOctagon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    printer: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />,
    eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    sun: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
    moon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  };

  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icons[name] || <circle cx="12" cy="12" r="9" strokeWidth={2} />}
    </svg>
  );
};

// Default Initial Seed Data
const DEFAULT_THRESHOLDS = {
  empty: 20,
  low: 40,
  medium: 60,
  high: 80,
  critical: 95
};

const INITIAL_BINS = [
  { id: "BIN-001", location: "Main Road Junction", area: "Main Road", capacity: 100, fill: 72, lat: 28.6139, lng: 77.2090, staff: "Staff 01", lastCollection: "2026-09-10 14:30", createdDate: "2026-08-15" },
  { id: "BIN-002", location: "City Market Gate 1", area: "City Market", capacity: 120, fill: 88, lat: 28.6145, lng: 77.2115, staff: "Staff 02", lastCollection: "2026-09-10 11:00", createdDate: "2026-08-15" },
  { id: "BIN-003", location: "City Market Food Court", area: "City Market", capacity: 150, fill: 98, lat: 28.6150, lng: 77.2120, staff: "Staff 01", lastCollection: "2026-09-09 18:00", createdDate: "2026-08-16" },
  { id: "BIN-004", location: "Central Bus Stand Bay 3", area: "Bus Stand", capacity: 200, fill: 94, lat: 28.6180, lng: 77.2050, staff: "Staff 02", lastCollection: "2026-09-10 08:15", createdDate: "2026-08-16" },
  { id: "BIN-005", location: "College Admin Block", area: "College Campus", capacity: 100, fill: 35, lat: 28.6110, lng: 77.2150, staff: "Staff 01", lastCollection: "2026-09-11 06:00", createdDate: "2026-08-17" },
  { id: "BIN-006", location: "College Cafeteria", area: "College Campus", capacity: 120, fill: 76, lat: 28.6118, lng: 77.2162, staff: "Staff 02", lastCollection: "2026-09-10 16:20", createdDate: "2026-08-17" },
  { id: "BIN-007", location: "Hospital Emergency Gate", area: "Hospital Road", capacity: 150, fill: 91, lat: 28.6220, lng: 77.2080, staff: "Staff 01", lastCollection: "2026-09-09 20:00", createdDate: "2026-08-18" },
  { id: "BIN-008", location: "Hospital OPD Block", area: "Hospital Road", capacity: 100, fill: 52, lat: 28.6228, lng: 77.2092, staff: "Staff 02", lastCollection: "2026-09-10 12:45", createdDate: "2026-08-18" },
  { id: "BIN-009", location: "Residential Block A Park", area: "Residential Area", capacity: 80, fill: 18, lat: 28.6080, lng: 77.2010, staff: "Staff 01", lastCollection: "2026-09-11 07:10", createdDate: "2026-08-19" },
  { id: "BIN-010", location: "Residential Block B Center", area: "Residential Area", capacity: 80, fill: 42, lat: 28.6095, lng: 77.2030, staff: "Staff 02", lastCollection: "2026-09-10 15:00", createdDate: "2026-08-19" },
  { id: "BIN-011", location: "Railway Station Platform 1", area: "Railway Station", capacity: 200, fill: 89, lat: 28.6250, lng: 77.2180, staff: "Staff 01", lastCollection: "2026-09-09 22:30", createdDate: "2026-08-20" },
  { id: "BIN-012", location: "Public Park North Gate", area: "Public Park", capacity: 100, fill: 24, lat: 28.6160, lng: 77.2010, staff: "Staff 02", lastCollection: "2026-09-11 05:40", createdDate: "2026-08-20" },
  { id: "BIN-013", location: "Shopping Mall Main Entrance", area: "Shopping Complex", capacity: 150, fill: 68, lat: 28.6190, lng: 77.2140, staff: "Staff 01", lastCollection: "2026-09-10 17:30", createdDate: "2026-08-21" },
  { id: "BIN-014", location: "Industrial Estate Road 4", area: "Industrial Area", capacity: 200, fill: 84, lat: 28.6280, lng: 77.1980, staff: "Staff 02", lastCollection: "2026-09-10 09:00", createdDate: "2026-08-21" },
  { id: "BIN-015", location: "High School Playground", area: "School Area", capacity: 100, fill: 15, lat: 28.6050, lng: 77.2100, staff: "Staff 01", lastCollection: "2026-09-11 06:50", createdDate: "2026-08-22" },
  { id: "BIN-016", location: "Govt Office Complex", area: "Government Office", capacity: 120, fill: 61, lat: 28.6175, lng: 77.2105, staff: "Staff 02", lastCollection: "2026-09-10 13:15", createdDate: "2026-08-22" },
  { id: "BIN-017", location: "Green Valley Apartments", area: "Apartment Area", capacity: 100, fill: 48, lat: 28.6070, lng: 77.2060, staff: "Staff 01", lastCollection: "2026-09-10 14:00", createdDate: "2026-08-23" },
  { id: "BIN-018", location: "City Stadium Gate 2", area: "Stadium Road", capacity: 150, fill: 59, lat: 28.6210, lng: 77.2210, staff: "Staff 02", lastCollection: "2026-09-10 10:30", createdDate: "2026-08-23" },
  { id: "BIN-019", location: "Highway Toll Plaza", area: "Highway Junction", capacity: 200, fill: 97, lat: 28.6320, lng: 77.2250, staff: "Staff 01", lastCollection: "2026-09-09 15:40", createdDate: "2026-08-24" },
  { id: "BIN-020", location: "Municipal Council Office", area: "Municipal Office", capacity: 100, fill: 10, lat: 28.6130, lng: 77.2070, staff: "Staff 02", lastCollection: "2026-09-11 07:30", createdDate: "2026-08-24" }
];

const INITIAL_USERS = [
  { id: 1, name: "Admin User", email: "admin@smartbin.com", role: "Admin", status: "Active" },
  { id: 2, name: "Staff 01", email: "staff1@smartbin.com", role: "Collection Staff", status: "Active" },
  { id: 3, name: "Staff 02", email: "staff2@smartbin.com", role: "Collection Staff", status: "Active" },
  { id: 4, name: "Viewer User", email: "viewer@smartbin.com", role: "Viewer", status: "Active" }
];

const INITIAL_TASKS = [
  { id: "CT-101", binId: "BIN-003", location: "City Market Food Court", fill: 98, priority: "Urgent", staff: "Staff 01", status: "Pending", createdTime: "10 minutes ago" },
  { id: "CT-102", binId: "BIN-004", location: "Central Bus Stand Bay 3", fill: 94, priority: "Urgent", staff: "Staff 02", status: "Assigned", createdTime: "25 minutes ago" },
  { id: "CT-103", binId: "BIN-019", location: "Highway Toll Plaza", fill: 97, priority: "Urgent", staff: "Staff 01", status: "In Progress", createdTime: "40 minutes ago" }
];

const INITIAL_COLLECTION_HISTORY = [
  { id: "CH-001", taskId: "CT-098", binId: "BIN-001", staff: "Staff 01", wasteCollectedKg: 84, date: "10 Sep 2026", status: "Completed" },
  { id: "CH-002", taskId: "CT-099", binId: "BIN-004", staff: "Staff 02", wasteCollectedKg: 102, date: "10 Sep 2026", status: "Completed" },
  { id: "CH-003", taskId: "CT-100", binId: "BIN-007", staff: "Staff 01", wasteCollectedKg: 125, date: "09 Sep 2026", status: "Completed" }
];

// Calculation Functions
function getBinStatus(fill, thresholds = DEFAULT_THRESHOLDS) {
  if (fill <= thresholds.empty) return "Empty";
  if (fill <= thresholds.low) return "Low";
  if (fill <= thresholds.medium) return "Medium";
  if (fill <= thresholds.high) return "High";
  if (fill <= thresholds.critical) return "Critical";
  return "Overflowing";
}

function getStatusBadgeStyle(status) {
  switch (status) {
    case "Empty": return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700";
    case "Low": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800";
    case "Medium": return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800";
    case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border border-orange-300 dark:border-orange-800";
    case "Critical": return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300 dark:border-red-800 animate-pulse";
    case "Overflowing": return "bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border border-purple-400 dark:border-purple-800 animate-bounce";
    default: return "bg-gray-100 text-gray-800";
  }
}

function getStatusFillClass(status) {
  switch (status) {
    case "Empty": return "fill-empty";
    case "Low": return "fill-low";
    case "Medium": return "fill-medium";
    case "High": return "fill-high";
    case "Critical": return "fill-critical";
    case "Overflowing": return "fill-overflowing";
    default: return "fill-low";
  }
}

function getPriorityInfo(fill, status) {
  let score = Math.min(100, Math.round(fill * 0.9 + (status === "Overflowing" ? 10 : status === "Critical" ? 5 : 0)));
  let label = "Low";
  let color = "text-slate-500 bg-slate-100 dark:bg-slate-800";
  
  if (score >= 81) {
    label = "Urgent";
    color = "text-red-700 bg-red-100 dark:bg-red-950 dark:text-red-300 border border-red-300";
  } else if (score >= 61) {
    label = "High";
    color = "text-orange-700 bg-orange-100 dark:bg-orange-950 dark:text-orange-300 border border-orange-300";
  } else if (score >= 31) {
    label = "Medium";
    color = "text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 border border-amber-300";
  }
  return { score, label, color };
}

function predictTimeUntilCritical(fill, status) {
  if (fill >= 81) return "Critical level reached! Immediate collection required.";
  let fillNeeded = 81 - fill;
  let estimatedHours = (fillNeeded / 4.0).toFixed(1);
  let hours = Math.floor(estimatedHours);
  let mins = Math.round((estimatedHours - hours) * 60);
  return `Est. ${hours}h ${mins}m remaining until Critical threshold (81%).`;
}

// MAIN APP COMPONENT
function App() {
  // Saved state initialization from LocalStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("smartbin_user");
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [theme, setTheme] = useState(() => localStorage.getItem("smartbin_theme") || "light");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [thresholds, setThresholds] = useState(() => {
    const saved = localStorage.getItem("smartbin_thresholds");
    return saved ? JSON.parse(saved) : DEFAULT_THRESHOLDS;
  });

  const [bins, setBins] = useState(() => {
    const saved = localStorage.getItem("smartbin_bins");
    return saved ? JSON.parse(saved) : INITIAL_BINS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("smartbin_tasks");
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [collectionHistory, setCollectionHistory] = useState(() => {
    const saved = localStorage.getItem("smartbin_history");
    return saved ? JSON.parse(saved) : INITIAL_COLLECTION_HISTORY;
  });

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem("smartbin_users_list");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [activityLogs, setActivityLogs] = useState([
    { id: 1, text: "System initialized software simulation engine", time: "Just now", type: "system" },
    { id: 2, text: "BIN-003 reached 98% (Overflowing alert)", time: "10 mins ago", type: "alert" },
    { id: 3, text: "Collection task CT-101 generated for BIN-003", time: "10 mins ago", type: "task" }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Overflow Alert", text: "BIN-019 reached 97%. Immediate collection required.", time: "5m ago", read: false, type: "danger" },
    { id: 2, title: "Critical Alert", text: "BIN-004 has reached 94%. Collection recommended.", time: "15m ago", read: false, type: "warning" },
    { id: 3, title: "Task Created", text: "Collection task CT-101 created for BIN-003", time: "25m ago", read: true, type: "info" }
  ]);

  // Simulation controls
  const [simActive, setSimActive] = useState(false);
  const [simSpeed, setSimSpeed] = useState("normal"); // slow: 10000, normal: 5000, fast: 2000
  const [simRandom, setSimRandom] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const [selectedAreaFilter, setSelectedAreaFilter] = useState("All");
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState("All");

  // UI Modals state
  const [selectedBinDetail, setSelectedBinDetail] = useState(null);
  const [addEditBinModalOpen, setAddEditBinModalOpen] = useState(false);
  const [editingBin, setEditingBin] = useState(null);
  const [deleteBinTarget, setDeleteBinTarget] = useState(null);
  const [vivaDemoWizardOpen, setVivaDemoWizardOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Apply theme effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("smartbin_theme", theme);
  }, [theme]);

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem("smartbin_bins", JSON.stringify(bins));
  }, [bins]);

  useEffect(() => {
    localStorage.setItem("smartbin_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("smartbin_history", JSON.stringify(collectionHistory));
  }, [collectionHistory]);

  useEffect(() => {
    localStorage.setItem("smartbin_thresholds", JSON.stringify(thresholds));
  }, [thresholds]);

  useEffect(() => {
    localStorage.setItem("smartbin_users_list", JSON.stringify(usersList));
  }, [usersList]);

  // Toast Helper
  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Activity log helper
  const addLog = (text, type = "info") => {
    setActivityLogs(prev => [
      { id: Date.now(), text, time: "Just now", type },
      ...prev.slice(0, 29)
    ]);
  };

  // Simulation Engine Interval Hook
  useEffect(() => {
    if (!simActive) return;
    const speedMs = simSpeed === "fast" ? 2000 : simSpeed === "slow" ? 8000 : 4000;

    const interval = setInterval(() => {
      setBins(prevBins => {
        return prevBins.map(bin => {
          // If bin fill is under 98%, simulate increase
          if (bin.fill < 100) {
            let increment = simRandom ? Math.floor(Math.random() * 4) + 1 : 2;
            let newFill = Math.min(100, bin.fill + increment);
            let oldStatus = getBinStatus(bin.fill, thresholds);
            let newStatus = getBinStatus(newFill, thresholds);

            // Trigger dynamic alert if status crossed critical threshold
            if ((newStatus === "Critical" || newStatus === "Overflowing") && oldStatus !== newStatus) {
              setNotifications(prev => [
                {
                  id: Date.now(),
                  title: `${newStatus} Alert`,
                  text: `${bin.id} (${bin.location}) reached ${newFill}%. Collection required!`,
                  time: "Just now",
                  read: false,
                  type: newStatus === "Overflowing" ? "danger" : "warning"
                },
                ...prev
              ]);
              addLog(`${bin.id} status changed to ${newStatus} (${newFill}%)`, "alert");
            }
            return { ...bin, fill: newFill };
          }
          return bin;
        });
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [simActive, simSpeed, simRandom, thresholds]);

  // Calculate dynamic stats
  const binStats = useMemo(() => {
    let counts = { Total: bins.length, EmptyLow: 0, Medium: 0, High: 0, Critical: 0, Overflowing: 0, PendingCollection: 0 };
    bins.forEach(b => {
      let st = getBinStatus(b.fill, thresholds);
      if (st === "Empty" || st === "Low") counts.EmptyLow++;
      else if (st === "Medium") counts.Medium++;
      else if (st === "High") counts.High++;
      else if (st === "Critical") counts.Critical++;
      else if (st === "Overflowing") counts.Overflowing++;
    });
    counts.PendingCollection = tasks.filter(t => t.status !== "Completed" && t.status !== "Cancelled").length;
    return counts;
  }, [bins, thresholds, tasks]);

  // Filtered Bins list
  const filteredBins = useMemo(() => {
    return bins.filter(b => {
      let st = getBinStatus(b.fill, thresholds);
      const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            st.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatusFilter === "All" || st === selectedStatusFilter;
      const matchesArea = selectedAreaFilter === "All" || b.area === selectedAreaFilter;
      
      let matchesCollection = true;
      if (selectedCollectionFilter !== "All") {
        let task = tasks.find(t => t.binId === b.id);
        if (selectedCollectionFilter === "Pending") matchesCollection = task && task.status === "Pending";
        else if (selectedCollectionFilter === "Assigned") matchesCollection = task && task.status === "Assigned";
        else if (selectedCollectionFilter === "In Progress") matchesCollection = task && task.status === "In Progress";
        else if (selectedCollectionFilter === "Completed") matchesCollection = !task || task.status === "Completed";
      }

      return matchesSearch && matchesStatus && matchesArea && matchesCollection;
    });
  }, [bins, thresholds, searchQuery, selectedStatusFilter, selectedAreaFilter, selectedCollectionFilter, tasks]);

  // Handle Bin Operations
  const handleSaveBin = (binFormData) => {
    if (editingBin) {
      setBins(prev => prev.map(b => b.id === editingBin.id ? { ...b, ...binFormData } : b));
      showToast(`Bin ${editingBin.id} updated successfully.`);
      addLog(`Admin updated details for ${editingBin.id}`);
    } else {
      if (bins.some(b => b.id === binFormData.id)) {
        showToast("Bin ID already exists! Please use a unique ID.", "error");
        return;
      }
      setBins(prev => [binFormData, ...prev]);
      showToast(`Bin ${binFormData.id} created successfully.`);
      addLog(`Admin created digital bin ${binFormData.id}`);
    }
    setAddEditBinModalOpen(false);
    setEditingBin(null);
  };

  const handleDeleteBin = (binId) => {
    setBins(prev => prev.filter(b => b.id !== binId));
    setTasks(prev => prev.filter(t => t.binId !== binId));
    showToast(`Bin ${binId} deleted.`);
    addLog(`Admin deleted bin ${binId}`);
    setDeleteBinTarget(null);
  };

  // Handle Task Creation & Workflow
  const handleCreateCollectionTask = (bin) => {
    let existing = tasks.find(t => t.binId === bin.id && t.status !== "Completed");
    if (existing) {
      showToast(`Task ${existing.id} already exists for ${bin.id}`, "warning");
      return;
    }
    let newTaskId = `CT-${100 + tasks.length + 1}`;
    let st = getBinStatus(bin.fill, thresholds);
    let priority = st === "Overflowing" || st === "Critical" ? "Urgent" : st === "High" ? "High" : "Medium";

    let newTask = {
      id: newTaskId,
      binId: bin.id,
      location: bin.location,
      fill: bin.fill,
      priority,
      staff: bin.staff || "Staff 01",
      status: "Pending",
      createdTime: "Just now"
    };

    setTasks(prev => [newTask, ...prev]);
    showToast(`Collection Task ${newTaskId} created for ${bin.id}`);
    addLog(`Created collection task ${newTaskId} for ${bin.id}`, "task");
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        let updated = { ...t, status: newStatus };
        if (newStatus === "Completed") {
          // Reset bin fill level!
          setBins(binsPrev => binsPrev.map(b => b.id === t.binId ? { ...b, fill: 8, lastCollection: new Date().toISOString().replace('T', ' ').substring(0, 16) } : b));
          
          // Add entry to collection history
          let wasteKg = Math.round(t.fill * 1.2);
          setCollectionHistory(hPrev => [{
            id: `CH-${Date.now().toString().slice(-4)}`,
            taskId: t.id,
            binId: t.binId,
            staff: t.staff,
            wasteCollectedKg: wasteKg,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: "Completed"
          }, ...hPrev]);

          showToast(`Task ${taskId} completed. Bin ${t.binId} fill reset to 8%!`);
          addLog(`Staff completed task ${taskId}. Reset ${t.binId} fill level.`, "task");
        } else {
          showToast(`Task ${taskId} status updated to ${newStatus}`);
        }
        return updated;
      }
      return t;
    }));
  };

  // Reset simulation to initial values
  const handleResetSimulation = () => {
    setBins(INITIAL_BINS);
    setSimActive(false);
    showToast("Simulation engine reset bins to initial state.");
    addLog("Reset all digital bins fill levels to initial state", "system");
  };

  // Handle Login / Logout
  if (!currentUser) {
    return <LoginPage onLogin={(user) => { setCurrentUser(user); localStorage.setItem("smartbin_user", JSON.stringify(user)); }} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col justify-between z-20">
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Icon name="bins" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 dark:text-white leading-tight">SmartBin</h1>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase">100% Software System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {[
              { id: "dashboard", label: "Dashboard", icon: "dashboard" },
              { id: "live", label: "Live Monitoring", icon: "activity", badge: simActive ? "LIVE" : null },
              { id: "bins", label: "All Bins", icon: "bins", count: bins.length },
              { id: "map", label: "Map View", icon: "map" },
              { id: "alerts", label: "Alerts", icon: "bell", count: notifications.filter(n=>!n.read).length },
              { id: "tasks", label: "Collection Tasks", icon: "truck", count: tasks.filter(t=>t.status!=="Completed").length },
              { id: "analytics", label: "Analytics", icon: "analytics" },
              { id: "reports", label: "Reports", icon: "reports" },
              { id: "users", label: "Users", icon: "users", adminOnly: true },
              { id: "settings", label: "Settings", icon: "settings" },
              { id: "profile", label: "Profile", icon: "profile" }
            ].map(item => {
              if (item.adminOnly && currentUser.role !== "Admin") return null;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.count > 0 && !item.badge && (
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${active ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs flex-shrink-0">
                {currentUser.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">{currentUser.role}</p>
              </div>
            </div>
            <button
              onClick={() => { setCurrentUser(null); localStorage.removeItem("smartbin_user"); }}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
              title="Logout"
            >
              <Icon name="logout" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 z-10">
          
          {/* Title & Viva Presentation Wizard Launcher */}
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white capitalize">
              {activeTab === "live" ? "Live Bin Monitoring & Software Simulation" : activeTab.replace("-", " ")}
            </h2>
            <button
              onClick={() => setVivaDemoWizardOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <Icon name="sparkles" className="w-4 h-4 animate-spin" />
              <span>Run Smart Monitoring Demo</span>
            </button>
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            
            {/* Quick Search */}
            <div className="relative hidden md:block">
              <Icon name="search" className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Bin ID, location, area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-transparent focus:border-emerald-500 focus:outline-none w-56"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              title="Toggle Light/Dark Theme"
            >
              <Icon name={theme === "light" ? "moon" : "sun"} className="w-5 h-5" />
            </button>

            {/* Notification Drawer Trigger */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors relative"
              >
                <Icon name="bell" className="w-5 h-5" />
                {notifications.some(n=>!n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
                )}
              </button>

              {/* Notification Popup Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">Notifications</h4>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">No notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-3 text-xs flex items-start gap-2.5 ${!n.read ? "bg-emerald-50/50 dark:bg-slate-700/40" : ""}`}>
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === "danger" ? "bg-purple-600" : n.type === "warning" ? "bg-red-500" : "bg-emerald-500"}`}></div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                            <p className="text-slate-600 dark:text-slate-400 mt-0.5">{n.text}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* TOAST NOTIFICATION CONTAINER */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700 animate-bounce">
            <Icon name={toastMessage.type === "error" ? "alertOctagon" : toastMessage.type === "warning" ? "alertTriangle" : "checkCircle"} className={`w-5 h-5 ${toastMessage.type === "error" ? "text-red-400" : toastMessage.type === "warning" ? "text-amber-400" : "text-emerald-400"}`} />
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* DYNAMIC CONTENT ROUTER */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <DashboardView
              stats={binStats}
              bins={bins}
              thresholds={thresholds}
              activityLogs={activityLogs}
              tasks={tasks}
              onSelectBin={(bin) => setSelectedBinDetail(bin)}
              onCreateTask={handleCreateCollectionTask}
              onStartDemo={() => setVivaDemoWizardOpen(true)}
            />
          )}

          {activeTab === "live" && (
            <LiveMonitoringView
              bins={bins}
              thresholds={thresholds}
              simActive={simActive}
              simSpeed={simSpeed}
              simRandom={simRandom}
              onToggleSim={() => { setSimActive(!simActive); addLog(simActive ? "Paused software simulation engine" : "Started software simulation engine", "system"); }}
              onResetSim={handleResetSimulation}
              onChangeSpeed={setSimSpeed}
              onChangeRandom={setSimRandom}
              onManualFillChange={(binId, fillVal) => {
                setBins(bins.map(b => b.id === binId ? { ...b, fill: fillVal } : b));
              }}
              onSelectBin={(bin) => setSelectedBinDetail(bin)}
              onCreateTask={handleCreateCollectionTask}
            />
          )}

          {activeTab === "bins" && (
            <AllBinsView
              bins={filteredBins}
              allBinsCount={bins.length}
              thresholds={thresholds}
              currentUser={currentUser}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={selectedStatusFilter}
              onStatusFilterChange={setSelectedStatusFilter}
              areaFilter={selectedAreaFilter}
              onAreaFilterChange={setSelectedAreaFilter}
              collectionFilter={selectedCollectionFilter}
              onCollectionFilterChange={setSelectedCollectionFilter}
              onSelectBin={(bin) => setSelectedBinDetail(bin)}
              onAddBin={() => { setEditingBin(null); setAddEditBinModalOpen(true); }}
              onEditBin={(bin) => { setEditingBin(bin); setAddEditBinModalOpen(true); }}
              onDeleteBin={(bin) => setDeleteBinTarget(bin)}
              onCreateTask={handleCreateCollectionTask}
            />
          )}

          {activeTab === "map" && (
            <MapView
              bins={bins}
              thresholds={thresholds}
              onSelectBin={(bin) => setSelectedBinDetail(bin)}
              onCreateTask={handleCreateCollectionTask}
            />
          )}

          {activeTab === "alerts" && (
            <AlertsView
              notifications={notifications}
              onMarkRead={(id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))}
              onClearAll={() => setNotifications([])}
            />
          )}

          {activeTab === "tasks" && (
            <CollectionTasksView
              tasks={tasks}
              history={collectionHistory}
              users={usersList}
              currentUser={currentUser}
              onUpdateStatus={handleUpdateTaskStatus}
            />
          )}

          {activeTab === "analytics" && (
            <AnalyticsView
              bins={bins}
              history={collectionHistory}
              thresholds={thresholds}
            />
          )}

          {activeTab === "reports" && (
            <ReportsView
              bins={bins}
              tasks={tasks}
              history={collectionHistory}
              thresholds={thresholds}
            />
          )}

          {activeTab === "users" && (
            <UsersView
              users={usersList}
              currentUser={currentUser}
              onUpdateUsers={setUsersList}
              showToast={showToast}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView
              thresholds={thresholds}
              onSaveThresholds={(newTh) => { setThresholds(newTh); showToast("Threshold settings saved."); }}
              simSpeed={simSpeed}
              onChangeSpeed={setSimSpeed}
              simRandom={simRandom}
              onChangeRandom={setSimRandom}
              onResetData={handleResetSimulation}
            />
          )}

          {activeTab === "profile" && (
            <ProfileView user={currentUser} />
          )}
        </main>
      </div>

      {/* MODAL DIALOGS */}
      {selectedBinDetail && (
        <BinDetailModal
          bin={selectedBinDetail}
          thresholds={thresholds}
          onClose={() => setSelectedBinDetail(null)}
          onCreateTask={handleCreateCollectionTask}
          onManualFillChange={(binId, fillVal) => {
            setBins(bins.map(b => b.id === binId ? { ...b, fill: fillVal } : b));
            setSelectedBinDetail(prev => prev ? { ...prev, fill: fillVal } : null);
          }}
        />
      )}

      {addEditBinModalOpen && (
        <AddEditBinModal
          editingBin={editingBin}
          onClose={() => { setAddEditBinModalOpen(false); setEditingBin(null); }}
          onSave={handleSaveBin}
        />
      )}

      {deleteBinTarget && (
        <DeleteConfirmationModal
          bin={deleteBinTarget}
          onConfirm={() => handleDeleteBin(deleteBinTarget.id)}
          onCancel={() => setDeleteBinTarget(null)}
        />
      )}

      {vivaDemoWizardOpen && (
        <VivaDemoWizardModal
          bins={bins}
          onClose={() => setVivaDemoWizardOpen(false)}
          onStepUpdate={(updatedBin, createdTask) => {
            if (updatedBin) {
              setBins(prev => prev.map(b => b.id === updatedBin.id ? updatedBin : b));
            }
            if (createdTask) {
              setTasks(prev => {
                if (prev.some(t => t.id === createdTask.id)) {
                  return prev.map(t => t.id === createdTask.id ? createdTask : t);
                }
                return [createdTask, ...prev];
              });
            }
          }}
          showToast={showToast}
          addLog={addLog}
        />
      )}

    </div>
  );
}

// LOGIN PAGE COMPONENT
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@smartbin.com");
  const [password, setPassword] = useState("password123");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    let role = email.includes("admin") ? "Admin" : email.includes("staff") ? "Collection Staff" : "Viewer";
    let name = email.includes("admin") ? "Admin User" : email.includes("staff") ? "Collection Staff" : "City Inspector";
    onLogin({ name, email, role, status: "Active" });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <Icon name="bins" className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Smart Bin Monitoring</h2>
          <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase mt-1">100% Software-Based Mini Project</p>
          <p className="text-xs text-slate-400 mt-2">Monitor Waste. Manage Collections. Keep Cities Clean.</p>
        </div>

        {/* Single Click Quick Preset Logins */}
        <div className="mb-6 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Quick Demo Login Presets</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onLogin({ name: "Admin User", email: "admin@smartbin.com", role: "Admin" })}
              className="px-2 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-all"
            >
              Admin
            </button>
            <button
              onClick={() => onLogin({ name: "Staff 01", email: "staff1@smartbin.com", role: "Collection Staff" })}
              className="px-2 py-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-sm transition-all"
            >
              Staff
            </button>
            <button
              onClick={() => onLogin({ name: "City Viewer", email: "viewer@smartbin.com", role: "Viewer" })}
              className="px-2 py-1.5 text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white rounded-xl shadow-sm transition-all"
            >
              Viewer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-200"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded text-emerald-500 focus:ring-0" />
              <span>Remember me</span>
            </label>
            <a href="#" onClick={(e)=>{e.preventDefault(); alert("Use quick presets above to sign in instantly!");}} className="text-emerald-400 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-sm mt-2"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// DASHBOARD VIEW COMPONENT
function DashboardView({ stats, bins, thresholds, activityLogs, tasks, onSelectBin, onCreateTask, onStartDemo }) {
  return (
    <div className="space-y-6">
      
      {/* Smart Insights Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
            <Icon name="sparkles" className="w-4 h-4" />
            <span>Smart System Insights</span>
          </div>
          <h3 className="text-xl font-extrabold">City Market Area has the highest average bin fill level (93%)</h3>
          <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
            {stats.Critical + stats.Overflowing} bins currently require collection. 3 collection tasks are pending assignment.
          </p>
        </div>
        <button
          onClick={onStartDemo}
          className="px-4 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl shadow-lg hover:bg-emerald-50 transition-all flex-shrink-0"
        >
          Launch Examiner Demo Mode
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: "Total Bins", val: stats.Total, color: "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white" },
          { label: "Empty / Low", val: stats.EmptyLow, color: "border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" },
          { label: "Medium", val: stats.Medium, color: "border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300" },
          { label: "High", val: stats.High, color: "border-orange-300 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300" },
          { label: "Critical", val: stats.Critical, color: "border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300" },
          { label: "Overflowing", val: stats.Overflowing, color: "border-purple-300 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300" },
          { label: "Tasks Pending", val: stats.PendingCollection, color: "border-blue-300 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300" }
        ].map((kpi, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${kpi.color} shadow-sm transition-all hover:scale-105`}>
            <p className="text-[11px] font-semibold opacity-80 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-2xl font-black mt-1">{kpi.val}</p>
          </div>
        ))}
      </div>

      {/* Critical Bins Requiring Attention Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="alertOctagon" className="w-5 h-5 text-red-500" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Critical & Overflowing Bins</h4>
          </div>
          <span className="text-xs text-slate-500">Auto-detected priority</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 px-3">Bin ID</th>
                <th className="pb-3 px-3">Location</th>
                <th className="pb-3 px-3">Area</th>
                <th className="pb-3 px-3 text-right">Fill Level</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Priority</th>
                <th className="pb-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {bins.filter(b => {
                let st = getBinStatus(b.fill, thresholds);
                return st === "Critical" || st === "Overflowing" || st === "High";
              }).slice(0, 5).map(bin => {
                let st = getBinStatus(bin.fill, thresholds);
                let prio = getPriorityInfo(bin.fill, st);
                return (
                  <tr key={bin.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                    <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{bin.id}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{bin.location}</td>
                    <td className="py-3 px-3 text-slate-500">{bin.area}</td>
                    <td className="py-3 px-3 text-right font-black text-slate-800 dark:text-white">{bin.fill}%</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${getStatusBadgeStyle(st)}`}>
                        {st}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${prio.color}`}>
                        {prio.label} ({prio.score})
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onSelectBin(bin)}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onCreateTask(bin)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold"
                        >
                          Dispatch
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Charts & Activity Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bin Status Distribution Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-3">Status Breakdown</h4>
          <div className="space-y-3">
            {[
              { label: "Empty (0-20%)", count: bins.filter(b=>getBinStatus(b.fill, thresholds)==="Empty").length, color: "bg-slate-400" },
              { label: "Low (21-40%)", count: bins.filter(b=>getBinStatus(b.fill, thresholds)==="Low").length, color: "bg-emerald-500" },
              { label: "Medium (41-60%)", count: bins.filter(b=>getBinStatus(b.fill, thresholds)==="Medium").length, color: "bg-amber-500" },
              { label: "High (61-80%)", count: bins.filter(b=>getBinStatus(b.fill, thresholds)==="High").length, color: "bg-orange-500" },
              { label: "Critical (81-95%)", count: bins.filter(b=>getBinStatus(b.fill, thresholds)==="Critical").length, color: "bg-red-500" },
              { label: "Overflowing (96-100%)", count: bins.filter(b=>getBinStatus(b.fill, thresholds)==="Overflowing").length, color: "bg-purple-600" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>{item.label}</span>
                  <span>{item.count} bins ({Math.round((item.count/bins.length)*100)}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${(item.count/bins.length)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Stream Log */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Live Activity Stream</h4>
            <span className="text-xs text-emerald-500 font-bold">Auto-Updating</span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 text-xs">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${log.type === "alert" ? "bg-red-500 animate-ping" : log.type === "task" ? "bg-amber-500" : "bg-emerald-500"}`}></div>
                <div className="flex-1 flex justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{log.text}</span>
                  <span className="text-[10px] text-slate-400">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

// LIVE MONITORING VIEW COMPONENT
function LiveMonitoringView({ bins, thresholds, simActive, simSpeed, simRandom, onToggleSim, onResetSim, onChangeSpeed, onChangeRandom, onManualFillChange, onSelectBin, onCreateTask }) {
  return (
    <div className="space-y-6">
      
      {/* Simulation Engine Toolbar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Smart Bin Simulation Control Engine</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${simActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400"}`}>
              {simActive ? "Engine Running" : "Engine Paused"}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generates realistic simulated waste fill progression across digital bins without physical sensors.
          </p>
        </div>

        {/* Engine Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onToggleSim}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
              simActive
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            <Icon name={simActive ? "pause" : "play"} className="w-4 h-4" />
            <span>{simActive ? "Pause Simulation" : "Start Simulation"}</span>
          </button>

          <button
            onClick={onResetSim}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Icon name="reset" className="w-4 h-4" />
            <span>Reset Bins</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl text-xs">
            {["slow", "normal", "fast"].map(spd => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all ${
                  simSpeed === spd ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500"
                }`}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Bins Graphical Visualizer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {bins.map(bin => {
          let st = getBinStatus(bin.fill, thresholds);
          return (
            <div key={bin.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">{bin.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${getStatusBadgeStyle(st)}`}>
                    {st}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate font-medium">{bin.location}</p>
                <p className="text-[10px] text-slate-400 truncate mb-3">{bin.area}</p>

                {/* GRAPHICAL BIN CANISTER VISUALIZATION */}
                <div className="relative w-full h-36 bin-container my-2 flex flex-col justify-end p-1 border-2 border-slate-300 dark:border-slate-600">
                  {/* Bin Lid Graphic */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-slate-400 dark:bg-slate-600 rounded-t-sm"></div>

                  {/* Liquid fill level height animation */}
                  <div
                    className={`w-full bin-liquid rounded-b-md ${getStatusFillClass(st)}`}
                    style={{ height: `${bin.fill}%` }}
                  ></div>

                  {/* Overlay Fill % Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-lg font-black drop-shadow-md text-slate-900 dark:text-white bg-white/70 dark:bg-slate-900/70 px-2 py-0.5 rounded-md">
                      {bin.fill}%
                    </span>
                  </div>
                </div>

                {/* Manual Simulation Fill Adjuster Slider */}
                <div className="mt-3 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-xl border border-slate-200 dark:border-slate-600/50">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                    <span>Manual Fill Control</span>
                    <span>{bin.fill}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bin.fill}
                    onChange={(e) => onManualFillChange(bin.id, parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onSelectBin(bin)}
                  className="flex-1 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold"
                >
                  View Detail
                </button>
                <button
                  onClick={() => onCreateTask(bin)}
                  className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
                  title="Create Collection Task"
                >
                  <Icon name="truck" className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

// ALL BINS VIEW COMPONENT
function AllBinsView({ bins, allBinsCount, thresholds, currentUser, searchQuery, onSearchChange, statusFilter, onStatusFilterChange, areaFilter, onAreaFilterChange, collectionFilter, onCollectionFilterChange, onSelectBin, onAddBin, onEditBin, onDeleteBin, onCreateTask }) {
  const areasList = ["All", "Main Road", "City Market", "Bus Stand", "College Campus", "Hospital Road", "Residential Area", "Railway Station", "Public Park", "Shopping Complex", "Industrial Area", "School Area", "Government Office", "Apartment Area", "Stadium Road", "Highway Junction", "Municipal Office"];

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Digital Bin Database ({bins.length} / {allBinsCount})</h3>
            <p className="text-xs text-slate-500">Manage digital records, thresholds and staff assignments</p>
          </div>
          
          {currentUser.role === "Admin" && (
            <button
              onClick={onAddBin}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span>Add Digital Bin</span>
            </button>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
          
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Search Bins</label>
            <input
              type="text"
              placeholder="Search ID or Location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              {["All", "Empty", "Low", "Medium", "High", "Critical", "Overflowing"].map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Area Filter</label>
            <select
              value={areaFilter}
              onChange={(e) => onAreaFilterChange(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              {areasList.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Collection Filter</label>
            <select
              value={collectionFilter}
              onChange={(e) => onCollectionFilterChange(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              {["All", "Pending", "Assigned", "In Progress", "Completed"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Bins Master Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Bin ID</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Area</th>
                <th className="py-3 px-3">Capacity</th>
                <th className="py-3 px-3 text-right">Fill %</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Priority Score</th>
                <th className="py-3 px-3">Staff</th>
                <th className="py-3 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {bins.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400">
                    No digital bins match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                bins.map(bin => {
                  let st = getBinStatus(bin.fill, thresholds);
                  let prio = getPriorityInfo(bin.fill, st);
                  return (
                    <tr key={bin.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{bin.id}</td>
                      <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">{bin.location}</td>
                      <td className="py-3 px-3 text-slate-500">{bin.area}</td>
                      <td className="py-3 px-3 text-slate-500">{bin.capacity} L</td>
                      <td className="py-3 px-3 text-right font-black text-slate-900 dark:text-white">{bin.fill}%</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${getStatusBadgeStyle(st)}`}>
                          {st}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${prio.color}`}>
                          {prio.label} ({prio.score})
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-semibold">{bin.staff}</td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onSelectBin(bin)}
                            className="p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg"
                            title="View Details"
                          >
                            <Icon name="eye" className="w-4 h-4" />
                          </button>

                          {currentUser.role === "Admin" && (
                            <>
                              <button
                                onClick={() => onEditBin(bin)}
                                className="p-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 rounded-lg"
                                title="Edit Bin"
                              >
                                <Icon name="edit" className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteBin(bin)}
                                className="p-1.5 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-700 dark:text-red-300 rounded-lg"
                                title="Delete Bin"
                              >
                                <Icon name="trash" className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// MAP VIEW COMPONENT (LEAFLET INTERACTIVE MAP)
function MapView({ bins, thresholds, onSelectBin, onCreateTask }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.L) return;
    if (!mapRef.current) {
      const map = L.map('leaflet-map-container').setView([28.6139, 77.2090], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;
    
    // Clear old markers if any
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add Bin Pin Markers
    bins.forEach(bin => {
      let st = getBinStatus(bin.fill, thresholds);
      let pinBg = st === "Overflowing" ? "#7e22ce" : st === "Critical" ? "#dc2626" : st === "High" ? "#ea580c" : st === "Medium" ? "#ca8a04" : "#16a34a";
      
      let customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div class="custom-pin" style="background-color: ${pinBg};"><span>${bin.fill}%</span></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      let marker = L.marker([bin.lat, bin.lng], { icon: customIcon }).addTo(map);

      let popupContent = `
        <div class="p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl">
          <div class="flex items-center justify-between mb-1">
            <span class="font-extrabold text-sm text-emerald-600">${bin.id}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded ${getStatusBadgeStyle(st)}">${st}</span>
          </div>
          <p class="text-xs font-semibold text-slate-700">${bin.location}</p>
          <p class="text-[10px] text-slate-400 mb-2">${bin.area}</p>
          
          <div class="w-full bg-slate-200 rounded-full h-2 my-2 overflow-hidden">
            <div class="h-full bg-emerald-500" style="width: ${bin.fill}%"></div>
          </div>
          <p class="text-xs font-bold text-right mb-3">${bin.fill}% Fill</p>
          
          <button id="map-btn-${bin.id}" class="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-sm">
            Create Task
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`map-btn-${bin.id}`);
        if (btn) {
          btn.onclick = () => onCreateTask(bin);
        }
      });
    });

  }, [bins, thresholds]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white">Interactive Geographic Map View</h3>
          <p className="text-xs text-slate-500">Visualizing digitally stored latitude/longitude coordinates of smart bins</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Empty/Low</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> High</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-600"></span> Critical</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-600"></span> Overflow</div>
        </div>
      </div>

      <div id="leaflet-map-container" className="w-full h-[600px] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md"></div>
    </div>
  );
}

// ALERTS VIEW COMPONENT
function AlertsView({ notifications, onMarkRead, onClearAll }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Smart System Alerts & Notifications</h3>
          <p className="text-xs text-slate-500">Real-time alerts triggered when bin fill thresholds cross high or critical levels</p>
        </div>
        <button
          onClick={onClearAll}
          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
        >
          Clear All Alerts
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Icon name="checkCircle" className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <p className="font-bold text-slate-800 dark:text-slate-200">No Active Alerts</p>
            <p className="text-xs text-slate-400 mt-1">All digital bins are within safe operational fill levels.</p>
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-all ${
              n.type === "danger"
                ? "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200"
                : n.type === "warning"
                ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
            }`}>
              <div className="flex items-start gap-3">
                <Icon name={n.type === "danger" ? "alertOctagon" : "alertTriangle"} className={`w-6 h-6 mt-0.5 ${n.type === "danger" ? "text-purple-600" : "text-red-500"}`} />
                <div>
                  <h4 className="font-bold text-sm">{n.title}</h4>
                  <p className="text-xs mt-1">{n.text}</p>
                  <span className="text-[10px] opacity-70 block mt-2">{n.time}</span>
                </div>
              </div>
              {!n.read && (
                <button
                  onClick={() => onMarkRead(n.id)}
                  className="px-3 py-1 bg-white/80 dark:bg-slate-700 text-xs font-bold rounded-lg shadow-sm"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// COLLECTION TASKS VIEW COMPONENT
function CollectionTasksView({ tasks, history, users, currentUser, onUpdateStatus }) {
  const [tab, setTab] = useState("active");

  return (
    <div className="space-y-6">
      
      {/* Header Tabs */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab === "active" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-300"}`}
          >
            Active Tasks ({tasks.filter(t=>t.status!=="Completed").length})
          </button>
          <button
            onClick={() => setTab("history")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab === "history" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-300"}`}
          >
            Collection History ({history.length})
          </button>
        </div>
      </div>

      {tab === "active" ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Task ID</th>
                  <th className="py-3 px-3">Bin ID</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3 text-right">Fill Level</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Assigned Staff</th>
                  <th className="py-3 px-3">Task Workflow Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {tasks.length === 0 ? (
                  <tr><td colSpan="8" className="py-8 text-center text-slate-400">No active collection tasks.</td></tr>
                ) : (
                  tasks.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="py-3 px-3 font-extrabold text-slate-800 dark:text-slate-200">{t.id}</td>
                      <td className="py-3 px-3 font-bold text-emerald-600">{t.binId}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{t.location}</td>
                      <td className="py-3 px-3 text-right font-black">{t.fill}%</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${t.priority === "Urgent" ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" : "bg-amber-100 text-amber-800"}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-300">{t.staff}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded-full font-extrabold text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {t.status === "Pending" && (
                            <button
                              onClick={() => onUpdateStatus(t.id, "Assigned")}
                              className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[10px] font-bold"
                            >
                              Assign
                            </button>
                          )}
                          {(t.status === "Pending" || t.status === "Assigned") && (
                            <button
                              onClick={() => onUpdateStatus(t.id, "In Progress")}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold"
                            >
                              Start
                            </button>
                          )}
                          {t.status === "In Progress" && (
                            <button
                              onClick={() => onUpdateStatus(t.id, "Completed")}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold shadow-sm"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">History Record</th>
                  <th className="py-3 px-3">Task Ref</th>
                  <th className="py-3 px-3">Bin ID</th>
                  <th className="py-3 px-3">Staff</th>
                  <th className="py-3 px-3 text-right">Waste Collected (kg)</th>
                  <th className="py-3 px-3">Completion Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {history.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                    <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{h.id}</td>
                    <td className="py-3 px-3 text-slate-500">{h.taskId}</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">{h.binId}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{h.staff}</td>
                    <td className="py-3 px-3 text-right font-black text-slate-900 dark:text-white">{h.wasteCollectedKg} kg</td>
                    <td className="py-3 px-3 text-slate-500">{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

// ANALYTICS VIEW COMPONENT
function AnalyticsView({ bins, history, thresholds }) {
  const totalWasteKg = history.reduce((acc, h) => acc + h.wasteCollectedKg, 4850);
  const avgFill = Math.round(bins.reduce((acc, b) => acc + b.fill, 0) / bins.length);
  const overflowEvents = bins.filter(b => getBinStatus(b.fill, thresholds) === "Overflowing").length + 23;

  return (
    <div className="space-y-6">
      
      {/* Analytics KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Waste Collected", val: `${totalWasteKg.toLocaleString()} kg`, color: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300" },
          { label: "Average Fill Level", val: `${avgFill}%`, color: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300" },
          { label: "Total Completed Collections", val: history.length + 182, color: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300" },
          { label: "Overflow Events", val: overflowEvents, color: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300" },
          { label: "Critical Bins Active", val: bins.filter(b=>getBinStatus(b.fill, thresholds)==="Critical").length, color: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300" }
        ].map((item, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${item.color} shadow-sm`}>
            <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">{item.label}</p>
            <p className="text-2xl font-black mt-2">{item.val}</p>
          </div>
        ))}
      </div>

      {/* Area-Wise Matrix Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
        <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Area-Wise Waste Generation Matrix</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                <th className="py-2 px-3">Area Name</th>
                <th className="py-2 px-3 text-right">Digital Bins</th>
                <th className="py-2 px-3 text-right">Average Fill %</th>
                <th className="py-2 px-3 text-right">Critical Count</th>
                <th className="py-2 px-3 text-right">Est. Daily Generation (kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {[
                { area: "City Market", count: 2, avg: 93, crit: 2, waste: 450 },
                { area: "Bus Stand", count: 1, avg: 94, crit: 1, waste: 320 },
                { area: "Hospital Road", count: 2, avg: 72, crit: 1, waste: 280 },
                { area: "Highway Junction", count: 1, avg: 97, crit: 1, waste: 310 },
                { area: "College Campus", count: 2, avg: 56, crit: 0, waste: 190 },
                { area: "Residential Area", count: 2, avg: 30, crit: 0, waste: 140 }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{row.area}</td>
                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.count}</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">{row.avg}%</td>
                  <td className="py-3 px-3 text-right font-bold text-red-500">{row.crit}</td>
                  <td className="py-3 px-3 text-right font-black text-emerald-600">{row.waste} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// REPORTS VIEW COMPONENT
function ReportsView({ bins, tasks, history, thresholds }) {
  const [reportType, setReportType] = useState("Bin Status Report");
  const [dateRange, setDateRange] = useState("Last 7 Days");

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Bin ID,Location,Area,Capacity,Fill %,Status\n";
    bins.forEach(b => {
      let st = getBinStatus(b.fill, thresholds);
      csvContent += `${b.id},"${b.location}","${b.area}",${b.capacity},${b.fill}%,${st}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `smartbin_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Report Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 no-print">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-semibold"
            >
              {["Bin Status Report", "Collection Report", "Waste Report", "Critical Bin Report", "Overflow Report", "Area Analysis Report"].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Time Filter</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-semibold"
            >
              {["Today", "Last 7 Days", "Last 30 Days", "Custom Date Range"].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Icon name="download" className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Icon name="printer" className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Output Card */}
      <div id="printable-report" className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Smart Waste Bin Monitoring System</h2>
            <p className="text-xs text-emerald-600 font-bold uppercase">{reportType} — Generated {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <p>100% Software-Based Mini Project</p>
            <p>Time Filter: {dateRange}</p>
          </div>
        </div>

        {/* Summary Table */}
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
              <th className="py-2 px-2">Bin ID</th>
              <th className="py-2 px-2">Location</th>
              <th className="py-2 px-2">Area</th>
              <th className="py-2 px-2 text-right">Fill %</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Staff</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {bins.map(bin => {
              let st = getBinStatus(bin.fill, thresholds);
              return (
                <tr key={bin.id}>
                  <td className="py-2.5 px-2 font-bold">{bin.id}</td>
                  <td className="py-2.5 px-2">{bin.location}</td>
                  <td className="py-2.5 px-2">{bin.area}</td>
                  <td className="py-2.5 px-2 text-right font-bold">{bin.fill}%</td>
                  <td className="py-2.5 px-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusBadgeStyle(st)}`}>{st}</span></td>
                  <td className="py-2.5 px-2">{bin.staff}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>

    </div>
  );
}

// USER MANAGEMENT VIEW COMPONENT (ADMIN)
function UsersView({ users, currentUser, onUpdateUsers, showToast }) {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Collection Staff");

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    let newUser = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Active"
    };
    onUpdateUsers([...users, newUser]);
    showToast(`User ${newUserName} added successfully.`);
    setShowAddUserModal(false);
    setNewUserName("");
    setNewUserEmail("");
  };

  const handleToggleUserStatus = (id) => {
    onUpdateUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
    showToast("User status updated.");
  };

  const handleDeleteUser = (id) => {
    onUpdateUsers(users.filter(u => u.id !== id));
    showToast("User deleted.");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">User Management</h3>
          <p className="text-xs text-slate-500">Manage digital system access roles (Admin, Collection Staff, Viewer)</p>
        </div>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Icon name="plus" className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-3">Name</th>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{u.name}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{u.email}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${u.role === "Admin" ? "bg-purple-100 text-purple-800" : u.role === "Collection Staff" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${u.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleToggleUserStatus(u.id)}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[10px] font-bold"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="px-2 py-1 bg-red-50 text-red-600 rounded text-[10px] font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Add System User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                <input type="text" required value={newUserName} onChange={e=>setNewUserName(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                <input type="email" required value={newUserEmail} onChange={e=>setNewUserEmail(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Access Role</label>
                <select value={newUserRole} onChange={e=>setNewUserRole(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs">
                  <option value="Admin">Admin</option>
                  <option value="Collection Staff">Collection Staff</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={()=>setShowAddUserModal(false)} className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// SETTINGS VIEW COMPONENT
function SettingsView({ thresholds, onSaveThresholds, simSpeed, onChangeSpeed, simRandom, onChangeRandom, onResetData }) {
  const [emptyVal, setEmptyVal] = useState(thresholds.empty);
  const [lowVal, setLowVal] = useState(thresholds.low);
  const [mediumVal, setMediumVal] = useState(thresholds.medium);
  const [highVal, setHighVal] = useState(thresholds.high);
  const [criticalVal, setCriticalVal] = useState(thresholds.critical);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveThresholds({
      empty: parseInt(emptyVal),
      low: parseInt(lowVal),
      medium: parseInt(mediumVal),
      high: parseInt(highVal),
      critical: parseInt(criticalVal)
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Fill Thresholds Settings Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">Fill Threshold Configurations</h3>
        <p className="text-xs text-slate-500 mb-6">Configure fill percentage boundaries for status classification</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Empty (Max %)</label>
              <input type="number" min="1" max="30" value={emptyVal} onChange={e=>setEmptyVal(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Low (Max %)</label>
              <input type="number" min="20" max="50" value={lowVal} onChange={e=>setLowVal(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Medium (Max %)</label>
              <input type="number" min="40" max="70" value={mediumVal} onChange={e=>setMediumVal(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">High (Max %)</label>
              <input type="number" min="60" max="90" value={highVal} onChange={e=>setHighVal(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Critical (Max %)</label>
              <input type="number" min="80" max="98" value={criticalVal} onChange={e=>setCriticalVal(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
            </div>
          </div>

          <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md">
            Save Threshold Settings
          </button>
        </form>
      </div>

      {/* Simulation Engine Parameters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">Simulation Engine Parameters</h3>
        <p className="text-xs text-slate-500 mb-4">Fine-tune dynamic fill rates and time intervals</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Random Fill Variation</p>
              <p className="text-[11px] text-slate-400">Add slight randomness to bin fill progression</p>
            </div>
            <input type="checkbox" checked={simRandom} onChange={e=>onChangeRandom(e.target.checked)} className="w-5 h-5 accent-emerald-500 rounded cursor-pointer" />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Simulation Tick Speed</p>
              <p className="text-[11px] text-slate-400">Controls how fast time ticks in simulation</p>
            </div>
            <div className="flex gap-2">
              {["slow", "normal", "fast"].map(s => (
                <button key={s} onClick={()=>onChangeSpeed(s)} className={`px-3 py-1 text-xs font-bold rounded-lg capitalize ${simSpeed === s ? "bg-emerald-600 text-white" : "bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
            <button onClick={onResetData} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold">
              Reset Application State to Default
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// PROFILE VIEW COMPONENT
function ProfileView({ user }) {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white text-xl font-bold flex items-center justify-center shadow-lg">
          {user.name.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{user.name}</h3>
          <p className="text-xs text-slate-500">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">{user.role}</span>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-3 text-xs">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">Role Capabilities</h4>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
          <li className="flex items-center gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-500" /> Digital Bin Management & Configuration</li>
          <li className="flex items-center gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-500" /> Software Simulation Controls (Play/Pause/Reset)</li>
          <li className="flex items-center gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-500" /> Collection Task Workflow & Staff Assignment</li>
          <li className="flex items-center gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-500" /> Interactive Leaflet Geographic Bin Map</li>
          <li className="flex items-center gap-2"><Icon name="checkCircle" className="w-4 h-4 text-emerald-500" /> Analytics Suite & CSV/Print Report Generation</li>
        </ul>
      </div>
    </div>
  );
}

// MODALS SECTION

// Bin Detail Modal
function BinDetailModal({ bin, thresholds, onClose, onCreateTask, onManualFillChange }) {
  let st = getBinStatus(bin.fill, thresholds);
  let prio = getPriorityInfo(bin.fill, st);
  let predTime = predictTimeUntilCritical(bin.fill, st);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>{bin.id}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadgeStyle(st)}`}>{st}</span>
            </h3>
            <p className="text-xs text-slate-500">{bin.location} ({bin.area})</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600"><Icon name="x" className="w-5 h-5" /></button>
        </div>

        {/* Graphical Bin Visualizer inside modal */}
        <div className="grid grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-700/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="h-44 bin-container relative p-1 flex flex-col justify-end">
            <div className="absolute top-0 left-0 right-0 h-3 bg-slate-400 rounded-t-sm"></div>
            <div className={`w-full bin-liquid rounded-b-md ${getStatusFillClass(st)}`} style={{ height: `${bin.fill}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black drop-shadow-md text-slate-900 dark:text-white bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-xl">
                {bin.fill}%
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div><span className="text-slate-400">Bin Capacity:</span> <p className="font-bold text-slate-800 dark:text-slate-200">{bin.capacity} Liters</p></div>
            <div><span className="text-slate-400">Waste Volume:</span> <p className="font-bold text-slate-800 dark:text-slate-200">{Math.round(bin.capacity * (bin.fill/100))} Liters</p></div>
            <div><span className="text-slate-400">Priority Score:</span> <p className={`font-bold inline-block px-2 py-0.5 rounded ${prio.color}`}>{prio.label} ({prio.score}/100)</p></div>
            <div><span className="text-slate-400">Assigned Staff:</span> <p className="font-bold text-slate-800 dark:text-slate-200">{bin.staff}</p></div>
          </div>
        </div>

        {/* Waste Prediction Banner */}
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200">
          <p className="font-bold flex items-center gap-1 mb-0.5"><Icon name="sparkles" className="w-4 h-4" /> Waste Fill Prediction</p>
          <p>{predTime}</p>
        </div>

        {/* Manual Fill Adjuster Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>Demo Manual Fill Adjuster</span>
            <span>{bin.fill}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={bin.fill}
            onChange={(e) => onManualFillChange(bin.id, parseInt(e.target.value))}
            className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs">Close</button>
          <button onClick={() => { onCreateTask(bin); onClose(); }} className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md">Create Collection Task</button>
        </div>

      </div>
    </div>
  );
}

// Add/Edit Bin Modal
function AddEditBinModal({ editingBin, onClose, onSave }) {
  const [id, setId] = useState(editingBin ? editingBin.id : `BIN-0${Math.floor(Math.random()*90)+21}`);
  const [location, setLocation] = useState(editingBin ? editingBin.location : "");
  const [area, setArea] = useState(editingBin ? editingBin.area : "City Market");
  const [capacity, setCapacity] = useState(editingBin ? editingBin.capacity : 100);
  const [fill, setFill] = useState(editingBin ? editingBin.fill : 20);
  const [staff, setStaff] = useState(editingBin ? editingBin.staff : "Staff 01");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !location) return;
    onSave({
      id,
      location,
      area,
      capacity: parseInt(capacity),
      fill: parseInt(fill),
      staff,
      lat: editingBin ? editingBin.lat : 28.6140 + (Math.random()*0.02 - 0.01),
      lng: editingBin ? editingBin.lng : 77.2090 + (Math.random()*0.02 - 0.01),
      lastCollection: editingBin ? editingBin.lastCollection : "Just now",
      createdDate: editingBin ? editingBin.createdDate : new Date().toISOString().substring(0, 10)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{editingBin ? "Edit Digital Bin" : "Add New Digital Bin"}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Bin ID</label>
            <input type="text" required disabled={!!editingBin} value={id} onChange={e=>setId(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Location Name</label>
            <input type="text" required value={location} onChange={e=>setLocation(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">City Area</label>
            <select value={area} onChange={e=>setArea(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs">
              {["Main Road", "City Market", "Bus Stand", "College Campus", "Hospital Road", "Residential Area", "Railway Station", "Public Park", "Shopping Complex", "Industrial Area"].map(a=><option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Capacity (Liters)</label>
              <input type="number" min="50" max="500" value={capacity} onChange={e=>setCapacity(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Initial Fill %</label>
              <input type="number" min="0" max="100" value={fill} onChange={e=>setFill(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Assigned Collection Staff</label>
            <select value={staff} onChange={e=>setStaff(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs">
              <option value="Staff 01">Staff 01</option>
              <option value="Staff 02">Staff 02</option>
            </select>
          </div>
          <div className="flex gap-2 pt-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-xl">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md">Save Bin</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmationModal({ bin, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center space-y-4">
        <Icon name="alertTriangle" className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Delete Digital Bin?</h3>
        <p className="text-xs text-slate-500">Are you sure you want to delete <span className="font-bold text-slate-800 dark:text-white">{bin.id}</span> ({bin.location})?</p>
        <div className="flex gap-2 pt-2">
          <button onClick={onCancel} className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-xl">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 bg-red-600 text-white text-xs font-bold rounded-xl">Delete</button>
        </div>
      </div>
    </div>
  );
}

// VIVA DEMO MODE STEP-BY-STEP WIZARD MODAL
function VivaDemoWizardModal({ bins, onClose, onStepUpdate, showToast, addLog }) {
  const [stage, setStage] = useState(1);
  const targetBinId = "BIN-001";
  const currentBin = bins.find(b => b.id === targetBinId) || bins[0];

  const handleNextStage = () => {
    if (stage === 1) {
      // Stage 2: 70%
      onStepUpdate({ ...currentBin, fill: 70 });
      showToast("BIN-001 simulated fill increased to 70%");
      setStage(2);
    } else if (stage === 2) {
      // Stage 3: 80%
      onStepUpdate({ ...currentBin, fill: 80 });
      showToast("BIN-001 fill level reached 80% (High)");
      setStage(3);
    } else if (stage === 3) {
      // Stage 4: 85% Critical Alert Trigger
      onStepUpdate({ ...currentBin, fill: 85 });
      showToast("Critical Alert! BIN-001 reached 85%", "warning");
      addLog("BIN-001 reached 85% (Critical Alert Generated)", "alert");
      setStage(4);
    } else if (stage === 4) {
      // Stage 5: Create Collection Task
      let newTask = { id: "CT-DEMO-999", binId: targetBinId, location: currentBin.location, fill: 85, priority: "Urgent", staff: "Staff 01", status: "Pending", createdTime: "Just now" };
      onStepUpdate(null, newTask);
      showToast("Collection Task CT-DEMO-999 auto-created!");
      setStage(5);
    } else if (stage === 5) {
      // Stage 6: Staff starts collection
      let updatedTask = { id: "CT-DEMO-999", binId: targetBinId, location: currentBin.location, fill: 85, priority: "Urgent", staff: "Staff 01", status: "In Progress", createdTime: "Just now" };
      onStepUpdate(null, updatedTask);
      showToast("Staff started collection task");
      setStage(6);
    } else if (stage === 6) {
      // Stage 7 & 8: Complete collection & Reset fill to 8%
      let completedTask = { id: "CT-DEMO-999", binId: targetBinId, location: currentBin.location, fill: 85, priority: "Urgent", staff: "Staff 01", status: "Completed", createdTime: "Just now" };
      onStepUpdate({ ...currentBin, fill: 8 }, completedTask);
      showToast("Collection completed! BIN-001 fill reset to 8%");
      addLog("Collection completed for BIN-001. Reset fill to 8%", "task");
      setStage(7);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 w-full max-w-xl shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">College Viva Presentation Mode</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">Smart Bin Monitoring Workflow Demo</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600"><Icon name="x" className="w-5 h-5" /></button>
        </div>

        {/* Wizard Progress Steps Indicator */}
        <div className="grid grid-cols-7 gap-1">
          {[1,2,3,4,5,6,7].map(s => (
            <div key={s} className={`h-2 rounded-full transition-all ${s <= stage ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}></div>
          ))}
        </div>

        {/* Stage Content */}
        <div className="p-5 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-slate-800 dark:text-white">Target: {currentBin.id} ({currentBin.location})</span>
            <span className="font-black text-lg text-emerald-600">{currentBin.fill}% Fill</span>
          </div>

          {stage === 1 && <p className="text-xs text-slate-600 dark:text-slate-300">Stage 1: BIN-001 initial state is at 60% fill. Click Next to simulate waste accumulation.</p>}
          {stage === 2 && <p className="text-xs text-slate-600 dark:text-slate-300">Stage 2: Fill level increased to 70%. Status automatically updated to High.</p>}
          {stage === 3 && <p className="text-xs text-slate-600 dark:text-slate-300">Stage 3: Fill level reached 80%. Approaching Critical threshold.</p>}
          {stage === 4 && <p className="text-xs text-red-600 dark:text-red-400 font-bold">Stage 4: Critical threshold crossed (85%)! Dynamic alert automatically generated.</p>}
          {stage === 5 && <p className="text-xs text-slate-600 dark:text-slate-300">Stage 5: Collection Task CT-DEMO-999 generated and assigned to Staff 01.</p>}
          {stage === 6 && <p className="text-xs text-blue-600 font-bold">Stage 6: Collection Staff started task execution (Status: In Progress).</p>}
          {stage === 7 && <p className="text-xs text-emerald-600 font-bold">Stage 7 Completed! Collection finished, bin fill reset to 8%, and analytics synced.</p>}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-xl">Close Demo</button>
          {stage < 7 ? (
            <button onClick={handleNextStage} className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md">
              Advance to Stage {stage + 1} &rarr;
            </button>
          ) : (
            <button onClick={onClose} className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md">
              Finish Viva Demo
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

// Render React Root
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
