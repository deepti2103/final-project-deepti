# MediaAesthetix
    An easy-to-use React application for beginners that displays a personalized dashboard with:
    A Creative Mood widget (open-meteo's seven-day weather plus a mini chart),
    A basic Tasks widget (persisted, add, toggle, and delete),
    A Settings widget (change display name and password, auto-accent from weather, dark/light theme).
    Made using Recharts, Firebase Auth, and Vite + React.

# Project Structure:
src/
  App.jsx
  main.jsx
  index.css
  firebase.js
  components/
    NavBar.jsx
    ProtectedRoute.jsx
    GuestRoute.jsx
    WeatherWidget.jsx
    TasksWidget.jsx
    SettingsWidget.jsx
    ErrorBoundary.jsx
  context/
    AuthContext.jsx
    DashboardStore.jsx
  pages/
    Home.jsx
    Login.jsx
    Signup.jsx
    Dashboard.jsx
    Profile.jsx
    NotFound.jsx

# Tech Stack
React Router v6 + React 18 in the tech stack
Firebase Auth (password/email; profile updates; secure redirects)
Recharts (line graph)
Open-Meteo API (7-day forecast, no key needed)
Basic Dashboard Context + Reducer (theme, accent, tasks, weather)

# Features:
Auth:
    To enter your email address, password, and username to register.
    Sign in and out
    routes that are protected (Dashboard, Profile)
    Routes for guests (Login, Signup)
    Editing the display name (Settings + Profile)
    Change your password

The dashboard:

    Creative Mood: displays a temperature chart, retrieves a seven-day forecast (Calgary lat/lon by default), and selects a weather-related accent color.
    Add, toggle, and delete tasks that are persistent in local storage
    Settings include changing the display name, changing the password, changing the theme (dark/light), and "matching accent to weather."

UI/UX:
    Mobile burger, or responsive navbar
    Desktop: three-column grid; mobile: one-column widgets
    Themes of light and dark

Accessibility:
    Keyboard-friendly buttons and forms
    Observable emphasis on inputs
    Error messages and labels

# Routes
/ Home (welcome, CTAs) 
/login Guest-only
/signup Guest-only
/dashboard Protected (requires auth)
/u/:uid Protected Profile
*Not Found

# Phase 1: Auth + Basic Dashboard
    Create a project structure using Vite + React.
    Set up Firebase Web SDK +.env.
    Put AuthContext into practice (onAuthStateChanged, signUp, login/logout, updateProfile).
    Create forms:
    Create forms:
    Username, email, and password for signup; client-side validation
    Enter your email address and password to log in.
    After signing up or logging in, go to /dashboard.
    "Welcome, {username}" is the render greeting.

* Code-Based Evidence is in:
    src/firebase.js, src/context/AuthContext.jsx
    src/pages/Login.jsx, src/pages/Signup.jsx, src/pages/Dashboard.jsx
    Route guards: ProtectedRoute.jsx, GuestRoute.jsx

# Phase 2: Routing and Navigation :
    NavBar that is responsive (mobile burger, links, and brand)
    Use React Router v6 to define routes.
    Route guards (protect private pages, reroute visitors)
    Add routing information to the README.
   
* Code-Based Evidence is in:
    src/components/NavBar.jsx
    Routes in src/App.jsx
    Guards: ProtectedRoute.jsx, GuestRoute.jsx

# Phase 3: State management scope, API, and dashboard widgets:
    Context + Reducer DashboardStore:
        Status: { theme, accent, autoAccent, tasks, weather, status, error }
        SET_THEME, SET_ACCENT, SET_AUTOACCENT, ADD_TASK, TOGGLE_TASK, DELETE_TASK, and WEATHER_* are among the actions.
        Local persistenceTheme, accent, autoaccent, and task storage
    Open-Meteo's WeatherWidget:
        Get the seven-day forecast
        Calculate "Creative Mood" using the weather code and temperature.
        If enabled, the accent color is automatically set.
        Recharts' line chart
    The TasksWidget:
        Add, change, or remove tasks
        Continued tasks
    The SettingsWidget:
        Theme (light/dark)
        "Adapt your accent to the weather." switch
        Change the display name
        Modify your password
    The profile page:
        Initials from the avatar, display name, email, join date, and last sign-in
        Make a UID copy.
        Change the display name

* Code-Based Evidence is in:
    src/context/DashboardStore.jsx
    src/components/WeatherWidget.jsx, TasksWidget.jsx, SettingsWidget.jsx
    src/pages/Profile.jsx

# How to run tests manually:
Auth: 
    Enter a new email address to sign up; you will be taken to /dashboard.
    Redirected to /login after logging out from the navbar.
    Enter the same login credentials → /dashboard.

The dashboard:
    Weather renders data and loads without crashing.
    Toggle "Match accent to weather" so that the new accent is used on buttons and links.
    Add a task, mark it as completed, and then remove it. Refresh → tasks continue.

Settings/Profile:
    After refreshing, the dark/light theme change remains.
    Update the display name, greeting, and profile.
    Modify your password; if it says "requires recent login," log out and back in, then try again.

Routing:
    When you attempt to access /dashboard while logged out, you are redirected to /login.
    While logged in, navigate to /login; you will be taken to /dashboard.

Responsiveness:
    Dashboard cards stack in a single column and the navbar burger opens and closes for mobile devices.
    Desktop width: grid with three columns.