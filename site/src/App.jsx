import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, Mail, Phone, MapPin, Copy, Check, GraduationCap,
  BadgeCheck, Smartphone, Globe, Server, Wrench, Layers, PenTool, Terminal,
  Code, Database, Bell, MousePointer2,
} from 'lucide-react';

/* Dwight Angelo Decena — Portfolio
   Fonts: Anton (display), Plus Jakarta Sans (body), JetBrains Mono (data).
   Palette: obsidian #070708, white headings, #9CA3AF body, crimson #DC2626. */

// Transparent-background cutout served from site/public. Set to null for the silhouette.
const PORTRAIT_SRC = '/portrait.webp';

const PROFILE = {
  name: 'Dwight Angelo Decena',
  first: 'Dwight Angelo',
  last: 'Decena',
  title: 'Mobile & Web Application Developer',
  bio: 'Mobile & Web Application Developer with a focus on building clean, user-centric digital experiences using React Native, React, and TypeScript. Passionate about turning complex ideas into functional, responsive code from concept to deployment.',
  email: 'dwightangelodecena@gmail.com',
  phone: '+63 977 346 4090',
  github: 'https://github.com/dwightangelodecena-cloud',
  githubHandle: 'dwightangelodecena-cloud',
  location: 'Philippines',
};

const PROJECTS = [
  {
    id: '01', kind: 'WEB', title: 'Bridges of Hope', sub: 'Web Portal',
    desc: 'Comprehensive healthcare web system for managing admissions, patient records, and staff analytics.',
    stack: ['React (JSX)', 'JavaScript', 'Tailwind CSS', 'Supabase'],
    live: 'https://bridgesofhope-delta.vercel.app/',
    repo: 'https://github.com/dwightangelodecena-cloud/-BridgesOfHope---Backup',
    span: 'lg:col-span-4', mono: 'BOH',
    image: '/projects/boh-web.webp', shot: 'web',
    slug: 'bridges-of-hope-web',
    details: {
      tagline: 'Case-management portal for an inpatient recovery facility.',
      overview: 'Bridges of Hope is the staff side of a case-management system built for Kalinga, a private inpatient recovery facility. Admins, nurses and program staff use it to run admissions, follow patients through care and discharge, manage wards and report on progress. It also powers the facility’s public website through a built-in CMS.',
      facts: [['TYPE', 'Web portal'], ['ROLES', 'Admin · Nurse · Program staff'], ['BACKEND', 'Supabase (PostgreSQL)'], ['DEPLOYED', 'Vercel']],
      features: [
        ['Admissions workflow', 'Admission requests from families move through a nurse review queue to admin approval.'],
        ['Discharge management', 'Program staff file discharge requests that admins review and complete.'],
        ['Ward & room management', 'Assign patients to rooms across the facility’s wards.'],
        ['Patient records', 'A central patient database with care notes and daily reports.'],
        ['Analytics & reports', 'Recharts dashboards, plus PDF exports generated with jsPDF.'],
        ['Nurse & program tools', 'Calendars, medical reports, recovery ladders and weekly progress reports.'],
        ['Staff & user management', 'Staff accounts created through Edge Functions, with welcome emails.'],
        ['Messaging & notifications', 'Messages, announcements and push notifications to the family app.'],
        ['AI-assisted drafting', 'Groq-powered drafts for notifications and weekly report digests, plus hospital referral scanning.'],
        ['Website CMS', 'Edit the public site’s pages and settings without touching code.'],
      ],
      languages: ['JavaScript', 'SQL', 'CSS', 'HTML'],
      roles: [['Admin', 'admissions, wards, staff, analytics and CMS'], ['Nurse', 'pending admissions, calendar and medical reports'], ['Program staff', 'weekly reports and discharge requests']],
      tools: [
        ['Frontend', ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion']],
        ['Backend & data', ['Supabase', 'PostgreSQL', 'Supabase Edge Functions', 'Row Level Security']],
        ['Libraries', ['Recharts', 'jsPDF', 'PDF.js', 'dnd kit', 'Swiper', 'Lucide']],
        ['AI & deployment', ['Groq API', 'Vercel', 'Git/GitHub']],
      ],
      data: 'Shares one Supabase project with the mobile app. About 66 SQL migrations define 20+ tables (patients, admission requests, discharge requests, weekly and daily reports, rooms, visitation requests, notifications and more), along with Row Level Security policies, realtime updates and storage buckets. Four Edge Functions handle staff account creation and deletion, push notifications and welcome emails.',
    },
  },
  {
    id: '02', kind: 'MOBILE', title: 'Bridges of Hope', sub: 'Mobile App',
    desc: 'Cross-platform mobile companion app for patient families to track admissions and receive real-time notifications.',
    stack: ['React Native', 'TypeScript', 'Supabase'],
    repo: 'https://github.com/dwightangelodecena-cloud/-BridgesOfHope---Backup',
    span: 'lg:col-span-2', mono: 'BOH',
    image: '/projects/boh-mobile.webp', shot: 'phone',
    slug: 'bridges-of-hope-mobile',
    details: {
      tagline: 'Family companion app for the Bridges of Hope recovery facility.',
      overview: 'Families of patients use this app to request admission, follow their loved one’s progress and stay in touch with staff. It runs on the same Supabase backend as the web portal, so updates from nurses and program staff reach families through push notifications.',
      facts: [['TYPE', 'Mobile app'], ['PLATFORM', 'Android · iOS (Expo)'], ['USERS', 'Patients’ families'], ['BUILDS', 'EAS (APK preview)']],
      features: [
        ['Admission requests', 'Submit an admission form and request an admission meeting.'],
        ['Patient progress', 'Follow progress, patient details and archived records.'],
        ['Reports', 'Read the reports the care team shares.'],
        ['Visits & appointments', 'Request and manage visitation schedules.'],
        ['Messages', 'Chat directly with facility staff.'],
        ['Push notifications', 'Expo notifications for updates from the care team.'],
        ['Discharge requests', 'Start a discharge request from the app.'],
        ['Secure onboarding', 'Sign-up with verification, informed consent and password recovery.'],
      ],
      languages: ['TypeScript'],
      roles: [['Family member', 'admissions, progress, visits, messages and reports']],
      tools: [
        ['Mobile', ['React Native', 'Expo', 'Expo Router', 'React Navigation', 'Reanimated']],
        ['Device features', ['Expo Notifications', 'Image Picker', 'Document Picker', 'Expo Audio', 'AsyncStorage']],
        ['Backend & data', ['Supabase', 'PostgreSQL']],
        ['Build', ['EAS Build', 'Git/GitHub']],
      ],
      data: 'Connects directly to the Supabase project it shares with the web portal. Each device’s push token is stored in a device_push_tokens table, so the portal’s Edge Function can notify the right families.',
    },
  },
  {
    id: '03', kind: 'MOBILE', title: 'Rhayz Kicks', sub: 'Mobile App',
    desc: 'Cross-platform mobile e-commerce application with dynamic store repositories and delivery tracking.',
    stack: ['Flutter', 'Dart', 'Laravel API'],
    repo: 'https://github.com/dwightangelodecena-cloud/RhayzKicks',
    span: 'lg:col-span-2', mono: 'RK',
    image: '/projects/rk-mobile.webp', shot: 'phone', bezel: true,
    slug: 'rhayz-kicks-mobile',
    details: {
      tagline: 'Flutter shopping app for a sneaker and apparel store.',
      overview: 'The customer app for Rhayz Kicks. Shoppers browse new drops by category and collection, save items to a wishlist, manage a cart and follow their orders through each delivery stage. Loyalty points and rewards are shared with the web store, where purchases and voucher redemption happen.',
      facts: [['TYPE', 'Mobile app'], ['PLATFORM', 'Flutter (Android · iOS)'], ['USERS', 'Customers'], ['BACKEND', 'Supabase + Laravel API']],
      features: [
        ['Storefront', 'Home screen with a hero carousel, promo banners and video ads.'],
        ['Categories & collections', 'Browse drops by category or curated collection.'],
        ['Product detail', 'Variants, colorways and image galleries for every item.'],
        ['Cart & wishlist', 'Kept in sync through the Laravel REST API.'],
        ['Order tracking', 'Order history with a step-by-step delivery tracker.'],
        ['Loyalty rewards', 'Points pop-up and a rewards panel.'],
        ['Account & help', 'Sign-in, profile and a help/FAQ screen.'],
      ],
      languages: ['Dart', 'PHP', 'SQL'],
      roles: [['Customer', 'browse, wishlist, cart, orders and rewards']],
      tools: [
        ['Mobile', ['Flutter', 'Provider', 'Google Fonts', 'video_player', 'shared_preferences']],
        ['API', ['Laravel', 'Laravel Sanctum', 'REST API', 'http']],
        ['Backend & data', ['Supabase', 'PostgreSQL']],
        ['Version control', ['Git/GitHub']],
      ],
      data: 'A store repository layer combines two sources: Supabase for items, variants, inventory, images and colorways, and a Laravel 13 REST API (PHP 8.3) for products, cart and wishlist. The API’s Eloquent models map onto the same tables the web store uses.',
    },
  },
  {
    id: '04', kind: 'WEB', title: 'Rhayz Kicks', sub: 'Web Platform',
    desc: 'High-performance sneaker e-commerce web platform featuring interactive cart drawers and wishlist management.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel API'],
    live: 'https://rhayz-kicks.vercel.app/',
    repo: 'https://github.com/dwightangelodecena-cloud/RhayzKicks',
    span: 'lg:col-span-4', mono: 'RK',
    image: '/projects/rk-web.webp', shot: 'web', pos: 'object-[50%_55%]',
    slug: 'rhayz-kicks-web',
    details: {
      tagline: 'Sneaker storefront with a full store back office.',
      overview: 'Rhayz Kicks is a shoe shop management system. Customers browse drops, use cart and wishlist drawers, check out online and earn loyalty points. Staff run the store from the same app, with point of sale, inventory, purchase orders, online order delivery and staff hours.',
      facts: [['TYPE', 'Web platform'], ['ROLES', 'Customer · Staff · Admin'], ['BACKEND', 'Supabase (PostgreSQL)'], ['DEPLOYED', 'Vercel']],
      features: [
        ['Storefront', 'Home, category, collection and product pages.'],
        ['Cart & wishlist drawers', 'Slide-out drawers that keep shoppers on the page.'],
        ['Online checkout', 'PayMongo checkout and payment webhooks through Supabase Edge Functions.'],
        ['Loyalty & vouchers', 'Customers earn points and redeem rewards from their account.'],
        ['Point of sale', 'In-store sales recorded through a create_sale() database function.'],
        ['Inventory & products', 'Products, variants, categories, collections and stock movements.'],
        ['Order fulfilment', 'Online orders tracked through each delivery stage.'],
        ['Vendors & purchase orders', 'Manage suppliers and restock orders.'],
        ['Staff & hours', 'Team management, shifts and time tracking.'],
        ['CMS & KPIs', 'Hero slides, banners, announcements and a KPI dashboard.'],
      ],
      languages: ['TypeScript', 'SQL', 'CSS'],
      roles: [['Customer', 'shop, checkout and rewards'], ['Staff', 'point of sale, orders and hours'], ['Admin', 'inventory, vendors, loyalty, CMS and team']],
      tools: [
        ['Frontend', ['React', 'TypeScript', 'Vite', 'React Router']],
        ['Backend & data', ['Supabase', 'PostgreSQL', 'Edge Functions', 'Row Level Security']],
        ['Payments', ['PayMongo']],
        ['Deployment', ['Vercel', 'Git/GitHub']],
      ],
      data: 'A 27-table Supabase PostgreSQL schema covers the catalogue (items, variants, colorways, images), stock (inventory, stock movements), in-store and online sales, vendors and purchase orders, staff shifts, loyalty vouchers and site content. SQL functions such as create_sale() and redeem_points() keep transactions consistent, and three Edge Functions handle PayMongo checkout, its webhook and staff account creation. The schema is documented with an ERD.',
    },
  },
];

const STACK = [
  { key: 'core', label: 'Core', icon: Layers, span: 'lg:col-span-6',
    items: ['Mobile & Web Application Development', 'UI/UX & Wireframing', 'Database Architecture', 'Version Control'] },
  { key: 'mobile', label: 'Mobile', icon: Smartphone, span: 'lg:col-span-2',
    items: ['Flutter', 'Dart', 'React Native'] },
  { key: 'web', label: 'Web Frontend', icon: Globe, span: 'lg:col-span-2',
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { key: 'backend', label: 'Backend / DB', icon: Server, span: 'lg:col-span-2',
    items: ['PHP', 'MySQL', 'Supabase', 'Laravel API'] },
  { key: 'tools', label: 'Tools', icon: Wrench, span: 'lg:col-span-6',
    items: ['Figma', 'VS Code', 'Android Studio', 'Oracle VirtualBox', 'Wireshark', 'Git/GitHub'] },
];

const CAPABILITIES = [
  { n: '01', icon: Code, title: 'Web & Systems Development', mock: 'web',
    desc: 'Full-stack web systems built end to end, from the database schema to the deployed interface. I build role-based portals and admin dashboards that staff use every day, with clear workflows and reliable data behind every screen.',
    tools: ['Web Development', 'System Design', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    deliver: ['Role-based dashboards', 'Admin & CMS tools', 'Reports & PDF export'],
    proof: 'bridges-of-hope-web' },
  { n: '02', icon: Smartphone, title: 'Mobile App Development', mock: 'mobile',
    desc: 'Cross-platform apps for Android and iOS that extend the same product to people on the go. One shared backend, a consistent design language, and native features like push notifications, camera and file uploads.',
    tools: ['React Native', 'Expo', 'Flutter', 'Dart', 'Cross-Platform Apps', 'State Management'],
    deliver: ['Push notifications', 'Sign-up & onboarding', 'Live data from the web'],
    proof: 'bridges-of-hope-mobile' },
  { n: '03', icon: Database, title: 'Backend & Databases', mock: 'backend',
    desc: 'The layer that keeps web and mobile in sync. I model relational data, write migrations and access rules, and build REST APIs and serverless functions, including online payments.',
    tools: ['Supabase', 'PostgreSQL', 'MySQL', 'Laravel', 'PHP', 'REST APIs'],
    deliver: ['Schemas & migrations', 'Row Level Security', 'Payments & webhooks'],
    proof: 'rhayz-kicks-web' },
  { n: '04', icon: PenTool, title: 'UI/UX & Wireframing', mock: 'design',
    desc: 'Before writing code, I map user flows and screens in Figma, from low-fidelity wireframes to clickable prototypes, so every build starts from a plan that has already been tested.',
    tools: ['Figma', 'Wireframing', 'Prototyping', 'User Flows', 'Responsive Design'],
    deliver: ['Wireframes', 'Clickable prototypes', 'User flow maps'] },
];

const PROCESS = [
  { n: '01', t: 'Map the flow', d: 'Wireframe screens and user journeys in Figma before writing code.' },
  { n: '02', t: 'Model the data', d: 'Design tables, relations and auth in MySQL or Supabase.' },
  { n: '03', t: 'Build the interface', d: 'Ship responsive UI in React, React Native or Flutter.' },
  { n: '04', t: 'Deploy & iterate', d: 'Push to Vercel, version with Git, refine from feedback.' },
];

// Certiport verification: visitors enter the code at verify.certiport.com.
const CERTS = [
  {
    title: 'IT Specialist — Databases', issuer: 'Certiport · Pearson',
    awarded: 'SEP 18, 2025', expires: 'SEP 2030',
    code: 'CHrG-Dwzr', score: 914, max: 1000,
    href: 'https://verify.certiport.com',
  },
];

// Brand marks from Simple Icons (CC0), 24x24 viewBox.
const TECH_LOGOS = {
  react: { hex: '#61DAFB', path: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z' },
  typescript: { hex: '#3178C6', path: 'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z' },
  flutter: { hex: '#54C5F8', path: 'M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z' },
  supabase: { hex: '#3FCF8E', path: 'M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z' },
  laravel: { hex: '#FF2D20', path: 'M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z' },
  tailwind: { hex: '#06B6D4', path: 'M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z' },
  figma: { hex: '#F24E1E', path: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z' },
  mysql: { hex: '#4479A1', path: 'M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z' },
  javascript: { hex: '#F7DF1E', path: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z' },
  dart: { hex: '#0175C2', path: 'M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z' },
  php: { hex: '#777BB4', path: 'M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z' },
  postgresql: { hex: '#4169E1', path: 'M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z' },
  css: { hex: '#1572B6', path: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z' },
  html: { hex: '#E34F26', path: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z' },
  expo: { hex: '#F5F5F5', path: 'M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77Z' },
  vite: { hex: '#646CFF', path: 'm8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z' },
  vercel: { hex: '#F5F5F5', path: 'M24 22.525H0l12-21.05 12 21.05z' },
  reactrouter: { hex: '#CA4245', path: 'M12.118 5.466a2.306 2.306 0 00-.623.08c-.278.067-.702.332-.953.583-.41.423-.49.609-.662 1.469-.08.423.41 1.43.847 1.734.45.317 1.085.502 2.065.608 1.429.16 1.84.636 1.84 2.197 0 1.377-.385 1.747-1.96 1.906-1.707.172-2.58.834-2.765 2.117-.106.781.41 1.76 1.125 2.091 1.627.768 3.15-.198 3.467-2.196.211-1.284.622-1.642 1.998-1.747 1.588-.133 2.409-.675 2.713-1.787.278-1.02-.304-2.157-1.297-2.554-.264-.106-.873-.238-1.35-.291-1.495-.16-1.879-.424-2.038-1.39-.225-1.337-.317-1.562-.794-2.09a2.174 2.174 0 00-1.613-.73zm-4.785 4.36a2.145 2.145 0 00-.497.048c-1.469.318-2.17 2.051-1.35 3.295 1.178 1.774 3.944.953 3.97-1.177.012-1.193-.98-2.143-2.123-2.166zM2.089 14.19a2.22 2.22 0 00-.427.052c-2.158.476-2.237 3.626-.106 4.182.53.145.582.145 1.111.013 1.191-.318 1.866-1.456 1.549-2.607-.278-1.02-1.144-1.664-2.127-1.64zm19.824.008c-.233.002-.477.058-.784.162-1.39.477-1.866 2.092-.98 3.336.557.794 1.96 1.058 2.82.516 1.416-.874 1.363-3.057-.093-3.746-.38-.186-.663-.271-.963-.268z' },
  framer: { hex: '#0055FF', path: 'M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z' },
  git: { hex: '#F05032', path: 'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187' },
};

// Display name (lowercased) -> TECH_LOGOS key, for tech chips on project pages.
const LOGO_FOR = {
  react: 'react', 'react native': 'react', typescript: 'typescript', javascript: 'javascript',
  flutter: 'flutter', dart: 'dart', php: 'php', laravel: 'laravel', 'laravel sanctum': 'laravel',
  supabase: 'supabase', 'supabase edge functions': 'supabase', 'edge functions': 'supabase',
  postgresql: 'postgresql', sql: 'postgresql', 'row level security': 'postgresql',
  'tailwind css': 'tailwind', css: 'css', html: 'html', vite: 'vite', vercel: 'vercel',
  expo: 'expo', 'expo router': 'expo', 'expo notifications': 'expo', 'eas build': 'expo',
  'react router': 'reactrouter', 'framer motion': 'framer', 'git/github': 'git', figma: 'figma', mysql: 'mysql',
};

const MARQUEE = [
  ['React', 'react'], ['React Native', 'react'], ['TypeScript', 'typescript'],
  ['Flutter', 'flutter'], ['Supabase', 'supabase'], ['Laravel API', 'laravel'],
  ['Tailwind CSS', 'tailwind'], ['Figma', 'figma'], ['MySQL', 'mysql'],
];

const NAV = [
  { id: 'hero', label: '01-HERO' },
  { id: 'capabilities', label: '02-WHAT I CAN DO' },
  { id: 'work', label: '03-WORK' },
  { id: 'stack', label: '04-STACK' },
  { id: 'info', label: '05-INFO' },
];

const go = (id) => (e) => {
  e?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---------- small pieces ---------- */

// lucide-react v1 dropped brand icons, so the GitHub mark is inlined.
function Github({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function SectionHead({ index, label, title, ghost }) {
  return (
    <div className="relative mb-10 md:mb-14">
      <span aria-hidden className="pointer-events-none absolute -top-8 right-0 font-display text-[clamp(4rem,14vw,11rem)] leading-none text-white/[0.035] select-none">
        {ghost}
      </span>
      <div className="relative flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-crimson">
        <span>{index}</span>
        <span className="h-px w-10 bg-crimson/60" />
        <span className="text-mute">{label}</span>
      </div>
      <h2 className="relative mt-4 max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight text-white [text-wrap:balance]">
        {title}
      </h2>
    </div>
  );
}

function Pill({ children, active }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors duration-200 ${active ? 'border-crimson/60 bg-crimson/10 text-white' : 'border-white/10 bg-white/[0.03] text-mute'}`}>
      {children}
    </span>
  );
}

function CopyRow({ icon: Icon, label, value, href }) {
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      const r = document.createRange();
      r.selectNodeContents(ref.current);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    }
  };
  return (
    <div className="group flex items-center gap-4 border-b border-white/10 py-4">
      <Icon className="h-4 w-4 shrink-0 text-crimson" />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] tracking-[0.2em] text-mute/70">{label}</div>
        {href ? (
          <a ref={ref} href={href} target="_blank" rel="noreferrer" className="block break-all text-white hover:text-crimson transition-colors">{value}</a>
        ) : (
          <span ref={ref} className="block break-all text-white select-all">{value}</span>
        )}
      </div>
      <button onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}
        className="rounded-md border border-white/10 p-2 text-mute hover:border-crimson/60 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson">
        {done ? <Check className="h-3.5 w-3.5 text-crimson" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function Portrait() {
  if (PORTRAIT_SRC) {
    return (
      <img src={PORTRAIT_SRC} alt={PROFILE.name}
        className="relative z-10 w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] [mask-image:radial-gradient(ellipse_56%_76%_at_50%_38%,black_62%,transparent_100%)]" />
    );
  }
  return (
    <svg viewBox="0 0 400 500" className="relative z-10 w-full" role="img" aria-label="Portrait placeholder">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24252a" />
          <stop offset="1" stopColor="#070708" />
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#DC2626" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#DC2626" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M200 70c-46 0-78 36-78 86 0 34 13 62 33 79l-4 34c-58 12-103 46-121 96-8 22-12 64-12 135h364c0-71-4-113-12-135-18-50-63-84-121-96l-4-34c20-17 33-45 33-79 0-50-32-86-78-86z"
        fill="url(#body)" stroke="url(#rim)" strokeWidth="2" />
      <text x="200" y="440" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="3" fill="#9CA3AF" opacity="0.6">PORTRAIT_SRC</text>
    </svg>
  );
}

function ContributionGrid() {
  const weeks = 52;
  const cells = [];
  let seed = 20260428;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let w = 0; w < weeks; w++) {
    const burst = Math.sin(w / 4.2) * 0.5 + 0.5;
    for (let d = 0; d < 7; d++) {
      const weekend = d === 0 || d === 6 ? 0.45 : 1;
      const v = rand() * (0.35 + burst * 0.75) * weekend;
      cells.push(v < 0.18 ? 0 : v < 0.38 ? 1 : v < 0.58 ? 2 : v < 0.78 ? 3 : 4);
    }
  }
  const shade = ['bg-white/[0.05]', 'bg-crimson/25', 'bg-crimson/45', 'bg-crimson/70', 'bg-crimson'];
  const months = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'];
  return (
    <div className="min-w-0">
      <div className="overflow-x-auto pb-2">
        <div className="w-max">
          <div className="mb-2 grid grid-cols-12 font-mono text-[9px] tracking-widest text-mute/60" style={{ width: weeks * 13 }}>
            {months.map((m) => <span key={m}>{m}</span>)}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {cells.map((l, i) => (
              <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${shade[l]} transition-transform duration-150 hover:scale-150`} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-widest text-mute/70">
        <span>ILLUSTRATIVE PATTERN · LIVE GRAPH ON GITHUB</span>
        <span className="flex items-center gap-1.5">
          LESS {shade.map((s) => <span key={s} className={`h-[10px] w-[10px] rounded-[2px] ${s}`} />)} MORE
        </span>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

function Header({ active }) {
  return (
    <header className="fixed inset-x-0 z-50 flex justify-center px-gutter" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}>
      <nav className="flex w-full max-w-[1400px] items-center justify-between gap-4 rounded-full border border-white/10 bg-black/50 py-2 pl-5 pr-2 backdrop-blur-xl">
        <a href="#hero" onClick={go('hero')} className="font-display text-xl tracking-wide text-white">
          DAD<span className="text-crimson">.</span>
        </a>
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={go(n.id)}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] transition-colors ${active === n.id ? 'bg-white/10 text-white' : 'text-mute hover:text-white'}`}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={go('contact')}
          className="rounded-full bg-crimson px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-white transition hover:bg-white hover:text-black">
          CONTACT ↗
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const toolCount = STACK.filter((s) => s.key !== 'core').reduce((n, s) => n + s.items.length, 0);
  return (
    <section id="hero" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.2em] text-mute">
          <span>DEV/PORTFOLIO — 2026 · PH</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/10 px-3 py-1.5 text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
            </span>
            AVAILABLE FOR PROJECTS &amp; INTERNSHIPS
          </span>
        </div>

        <div className="relative mt-6 md:mt-4">
          <h1 aria-label={PROFILE.name}
            className="hero-word select-none whitespace-nowrap text-center font-display leading-[0.82] tracking-[-0.01em] text-[clamp(4.25rem,22.4vw,20.5rem)]">
            PORTFOLIO
          </h1>
        </div>

        <div className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="relative z-20 order-2 lg:order-1 lg:col-span-4 lg:pb-10">
            <div className="font-mono text-[11px] tracking-[0.2em] text-crimson">// HELLO, I'M</div>
            <p className="mt-3 text-4xl md:text-5xl font-semibold leading-[1.02] tracking-tight text-white">
              {PROFILE.first}<br />{PROFILE.last}
            </p>
            <p className="mt-4 text-base text-mute">{PROFILE.title}</p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 font-mono">
              {[
                ['02', 'PROJECTS'],
                [String(toolCount), 'TOOLS'],
                ['BSIT', 'NU-D'],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="text-[10px] tracking-[0.2em] text-mute/70">{k}</dt>
                  <dd className="mt-1 text-xl text-white tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4 -mt-[18vw] md:-mt-[16vw] lg:-mt-[12.5rem]">
            <div className="relative left-1/2 w-[min(88vw,540px)] -translate-x-1/2">
              <div aria-hidden className="absolute inset-x-[8%] bottom-[10%] top-[18%] rounded-full bg-crimson/30 blur-[70px]" />
              <Portrait />
              <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-obsidian to-transparent" />
            </div>
          </div>

          <div className="relative z-20 order-3 lg:col-span-4 lg:pb-10">
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-mute">{PROFILE.bio}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#work" onClick={go('work')}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-[12px] tracking-wider text-black transition hover:bg-crimson hover:text-white">
                [ View Selected Work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> ]
              </a>
              <a href="#contact" onClick={go('contact')}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-mono text-[12px] tracking-wider text-white transition hover:border-crimson hover:text-crimson">
                [ Let&apos;s Connect <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> ]
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 border-y border-white/10 bg-white/[0.02] py-4 overflow-hidden">
        <div className="marquee flex w-max gap-10 font-mono text-[11px] tracking-[0.25em] text-mute/80">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10" aria-hidden={k === 1}>
              {MARQUEE.map(([t, logo]) => (
                <span key={t} className="flex items-center gap-10">
                  <span className="group flex items-center gap-2.5 transition-colors hover:text-white">
                    <svg viewBox="0 0 24 24" aria-hidden="true"
                      className="h-[18px] w-[18px] opacity-80 transition duration-200 group-hover:scale-110 group-hover:opacity-100"
                      style={{ fill: TECH_LOGOS[logo].hex }}>
                      <path d={TECH_LOGOS[logo].path} />
                    </svg>
                    {t.toUpperCase()}
                  </span>
                  <span className="text-crimson">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <a href={`#${p.slug}`} aria-label={`Open ${p.title} ${p.sub} details`}
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-crimson/50 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.25),0_24px_70px_-20px_rgba(220,38,38,0.45)] motion-reduce:transform-none ${p.span}`}>
      <div className={`relative overflow-hidden border-b border-white/10 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(220,38,38,0.18),transparent_55%)] ${p.image ? 'h-72 md:h-80' : 'h-56 md:h-64'}`}>
        <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
        {!p.image && (
          <span aria-hidden className="absolute -bottom-6 left-4 font-display text-[7.5rem] leading-none text-white/[0.06] transition-colors duration-300 group-hover:text-crimson/25">
            {p.mono}
          </span>
        )}
        {p.shot === 'web' && (
          <div className="absolute inset-x-5 bottom-0 top-14 overflow-hidden rounded-t-xl border border-b-0 border-white/15 bg-black shadow-[0_-10px_50px_-10px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1.5 motion-reduce:transform-none">
            <div aria-hidden className="flex h-6 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <img src={p.image} alt={`${p.title} ${p.sub.toLowerCase()} home page`} loading="lazy"
              className={`h-[calc(100%-1.5rem)] w-full object-cover ${p.pos || 'object-left-top'}`} />
          </div>
        )}
        {p.shot === 'phone' && p.bezel && (
          <div className="absolute left-1/2 top-14 w-[72%] max-w-[320px] -translate-x-1/2 overflow-hidden rounded-[2.2rem] border-[7px] border-[#1b1b1d] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/15 transition-transform duration-500 group-hover:-translate-y-2 motion-reduce:transform-none">
            <span aria-hidden className="absolute left-1/2 top-2 z-10 h-4 w-[30%] -translate-x-1/2 rounded-full bg-black" />
            <img src={p.image} alt={`${p.title} ${p.sub.toLowerCase()} home screen`} loading="lazy" className="block w-full" />
          </div>
        )}
        {p.shot === 'phone' && !p.bezel && (
          <img src={p.image} alt={`${p.title} ${p.sub.toLowerCase()} home screen`} loading="lazy"
            className="absolute left-1/2 top-14 w-[72%] max-w-[320px] -translate-x-1/2 rounded-[9%/4.2%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-2 motion-reduce:transform-none" />
        )}
        <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
          <span className="text-crimson">{p.id}</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-mute">{p.kind}</span>
        </div>
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 font-mono text-[12px] tracking-[0.15em] text-white">
            VIEW PROJECT <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
        {p.live && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" /> LIVE
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="font-mono text-[10px] tracking-[0.2em] text-mute/70">{p.sub.toUpperCase()}</div>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white [text-wrap:balance]">{p.title}</h3>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-mute">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => <Pill key={s}>{s}</Pill>)}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[11px] tracking-[0.15em]">
          <span className="inline-flex items-center gap-1.5 text-white transition-colors group-hover:text-crimson">
            DETAILS &amp; TECH <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <span className="text-mute/60">{p.live ? 'LIVE DEMO · SOURCE' : 'SOURCE'}</span>
        </div>
      </div>
    </a>
  );
}

/* ---------- what I can do: animated capability mocks ---------- */

function MockFrame({ title, children, className = '' }) {
  return (
    <div className={`relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-black/60 md:h-80 ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="mx-auto min-w-0 truncate rounded-md bg-white/[0.06] px-3 py-1 font-mono text-[10px] text-mute">{title}</span>
      </div>
      {children}
    </div>
  );
}

function SchemaBox({ name, fields }) {
  return (
    <div className="w-[78%] rounded-lg border border-white/15 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px]">
      <div className="text-white">{name}</div>
      {fields.map((f, i) => (
        <div key={f} className="text-mute"><span className={i === 0 ? 'text-crimson' : 'text-mute/60'}>{i === 0 ? '◆' : '◇'}</span> {f}</div>
      ))}
    </div>
  );
}

function Link2() {
  return (
    <svg viewBox="0 0 40 14" className="ml-5 h-3.5 w-10" aria-hidden>
      <path d="M4 0 V14" className="anim-dash" fill="none" stroke="#DC2626" strokeWidth="1.2" />
    </svg>
  );
}

function WebMock() {
  const rows = [['ADM-0142', 'Pending review', true], ['ADM-0141', 'Approved'], ['ADM-0140', 'Approved'], ['ADM-0139', 'Discharged']];
  return (
    <MockFrame title="bridges-of-hope / admin / admissions">
      <div className="grid h-[calc(100%-2.25rem)] grid-cols-5 gap-4 p-4">
        <div className="col-span-2 hidden flex-col justify-center sm:flex">
          <SchemaBox name="admission_requests" fields={['id', 'status', 'patient_id']} />
          <Link2 />
          <SchemaBox name="patients" fields={['id', 'room_id']} />
          <Link2 />
          <SchemaBox name="rooms" fields={['id', 'ward']} />
        </div>
        <div className="col-span-5 flex min-w-0 flex-col gap-2.5 sm:col-span-3">
          <div className="grid grid-cols-3 gap-2">
            {[['PENDING', '0s'], ['APPROVED', '0.6s'], ['IN CARE', '1.2s']].map(([k, delay]) => (
              <div key={k} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <div className="font-mono text-[9px] tracking-[0.15em] text-mute">{k}</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="anim-fill h-full rounded-full bg-crimson" style={{ animationDelay: delay }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col overflow-hidden rounded-lg border border-white/10">
            {rows.map(([id, s, live], i) => (
              <div key={id} className={`flex items-center gap-3 border-b border-white/5 px-3 py-2.5 last:border-0 ${live ? 'anim-row' : ''}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-crimson' : 'bg-white/25'}`} />
                <span className="font-mono text-[11px] text-white">{id}</span>
                <span className="ml-auto truncate text-[11px] text-mute">{s}</span>
                <span className="hidden h-1 w-12 rounded-full bg-white/10 md:block" style={{ opacity: 1 - i * 0.2 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function MobileMock() {
  const actions = ['Report', 'Admit', 'Services', 'Chat'];
  return (
    <div className="relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(70%_80%_at_50%_100%,rgba(220,38,38,0.25),transparent_70%)] md:h-80">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <div className="anim-float absolute left-[4%] top-[22%] z-10 hidden rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white backdrop-blur sm:block">
        <span className="text-crimson">●</span> PUSH · EXPO
      </div>
      <div className="anim-float absolute right-[4%] top-[46%] z-10 hidden rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-white backdrop-blur sm:block" style={{ animationDelay: '1.5s' }}>
        <span className="text-[#3FCF8E]">●</span> SYNCED · SUPABASE
      </div>
      <div className="absolute left-1/2 top-6 h-[22rem] w-52 -translate-x-1/2 overflow-hidden rounded-[2.2rem] border-[6px] border-[#1b1b1d] bg-[#0c0d10] px-4 pt-3 shadow-[0_30px_70px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className="flex items-center justify-between font-mono text-[9px] text-white/80">
          <span>9:41</span>
          <span className="h-3.5 w-16 rounded-full bg-black" />
          <span>●●●</span>
        </div>
        <div className="anim-toast absolute inset-x-3 top-8 z-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[10px] font-medium text-black shadow-lg">
          <Bell className="h-3.5 w-3.5 shrink-0 text-crimson" /> Weekly report is ready
        </div>
        <div className="mt-6 text-[11px] text-mute">Good afternoon,</div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-white">Family</div>
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-crimson to-orange-400" />
        </div>
        <div className="mt-3 rounded-2xl bg-crimson p-3.5 text-white">
          <div className="font-mono text-[9px] tracking-[0.2em] text-white/80">OVERALL PROGRESS</div>
          <div className="mt-1 text-xl font-semibold">Steady recovery</div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-black/25">
            <div className="anim-fill h-full rounded-full bg-white" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {actions.map((a) => (
            <div key={a} className="flex flex-col items-center gap-1">
              <span className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.06]" />
              <span className="text-[8px] text-mute">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackendMock() {
  const ok = <span className="text-[#3FCF8E]">✓</span>;
  const prompt = <span className="text-crimson">$</span>;
  return (
    <MockFrame title="terminal — rhayz-kicks">
      <div className="h-[calc(100%-2.25rem)] overflow-hidden p-4 font-mono text-[11px] leading-[1.9]">
        <div className="min-w-0 truncate">{prompt} <span className="text-white">supabase db push</span></div>
        <div className="truncate text-mute">  applying migrations 002 → 025</div>
        <div className="truncate">{ok} <span className="text-white/90">online_orders</span> <span className="text-mute">· row level security on</span></div>
        <div className="truncate">{ok} <span className="text-white/90">create_sale()</span> <span className="text-mute">· function ready</span></div>
        <div className="truncate">{prompt} <span className="text-white">php artisan route:list --path=api</span></div>
        <div className="truncate text-mute">  GET /api/products · /api/cart · /api/wishlist</div>
        <div>{prompt} <span className="anim-blink text-white">▍</span></div>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 font-mono text-[9px] tracking-[0.15em] text-white">
        <span className="shrink-0 rounded-md border border-white/15 bg-black/70 px-2 py-1.5">APP</span>
        <span className="relative h-px flex-1 bg-white/15"><span className="anim-travel absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-crimson shadow-[0_0_10px_#DC2626]" /></span>
        <span className="shrink-0 rounded-md border border-crimson/50 bg-black/70 px-2 py-1.5">EDGE FN / API</span>
        <span className="relative h-px flex-1 bg-white/15"><span className="anim-travel absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-crimson shadow-[0_0_10px_#DC2626]" style={{ animationDelay: '1.2s' }} /></span>
        <span className="shrink-0 rounded-md border border-white/15 bg-black/70 px-2 py-1.5">POSTGRES</span>
      </div>
    </MockFrame>
  );
}

function DesignMock() {
  const frames = [['SEARCH', [70, 40, 40, 40]], ['BOOK', [100, 30, 55]], ['PAY', [45, 45, 30, 60]]];
  return (
    <div className="relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e11] bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:16px_16px] md:h-80">
      <div className="absolute left-4 top-4 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-mute">Figma · user flow</div>
      <div className="flex h-full items-center justify-center gap-3 px-4 sm:gap-5">
        {frames.map(([label, blocks], i) => (
          <React.Fragment key={label}>
            {i > 0 && (
              <svg viewBox="0 0 40 10" className="h-3 w-6 shrink-0 sm:w-10" aria-hidden>
                <path d="M0 5 H34" className="anim-dash" fill="none" stroke="#9CA3AF" strokeWidth="1" />
                <path d="M32 1 L38 5 L32 9" fill="none" stroke="#9CA3AF" strokeWidth="1" />
              </svg>
            )}
            <div className="relative shrink-0">
              <div className={`mb-1.5 font-mono text-[9px] tracking-[0.2em] ${i === 1 ? 'text-crimson' : 'text-mute'}`}>{label}</div>
              <div className="relative">
                <div className={`flex h-40 w-[5.5rem] flex-col gap-1.5 rounded-xl border bg-white/[0.03] p-2 sm:h-44 sm:w-24 ${i === 1 ? 'border-crimson ring-2 ring-crimson/25' : 'border-white/15'}`}>
                  <span className="h-2 w-1/2 rounded-sm bg-white/25" />
                  {blocks.map((h, j) => (
                    <span key={j} className="w-full rounded-md bg-white/[0.08]" style={{ height: h * 0.45 }} />
                  ))}
                  <span className={`mt-auto h-4 w-full rounded-md ${i === 1 ? 'bg-crimson' : 'bg-white/20'}`} />
                </div>
                {i === 1 && ['-left-1 -top-1', '-right-1 -top-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos) => (
                  <span key={pos} className={`absolute h-2 w-2 border border-crimson bg-white ${pos}`} />
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="anim-cursor pointer-events-none absolute inset-0" aria-hidden>
        <MousePointer2 className="h-4 w-4 fill-crimson text-crimson" />
        <span className="ml-3 inline-block rounded bg-crimson px-1.5 py-0.5 font-mono text-[9px] text-white">Dwight</span>
      </div>
    </div>
  );
}

const MOCKS = { web: WebMock, mobile: MobileMock, backend: BackendMock, design: DesignMock };

function CapabilityCard({ c }) {
  const Icon = c.icon;
  const Mock = MOCKS[c.mock];
  const proof = PROJECTS.find((p) => p.slug === c.proof);
  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 transition duration-500 hover:border-crimson/40 hover:shadow-[0_30px_90px_-40px_rgba(220,38,38,0.6)] md:p-9">
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-crimson/20 opacity-50 blur-[90px] transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-crimson transition-colors duration-300 group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.25em]">
          <span className="text-crimson">{c.n}</span><span className="text-mute"> / CAPABILITY</span>
        </span>
      </div>
      <h3 className="relative mt-7 text-3xl font-semibold leading-[1.05] tracking-tight text-white [text-wrap:balance] md:text-[2.6rem]">{c.title}</h3>
      <p className="relative mt-4 max-w-[58ch] text-[15px] leading-relaxed md:text-base">{c.desc}</p>
      <div className="relative mt-6 flex flex-wrap gap-2">
        {c.tools.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[11px] text-white/80 transition-colors hover:border-crimson hover:text-white">{t}</span>
        ))}
      </div>
      <ul className="relative mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {c.deliver.map((d) => (
          <li key={d} className="flex items-center gap-2 text-sm text-white/90">
            <Check className="h-4 w-4 shrink-0 text-crimson" /> {d}
          </li>
        ))}
      </ul>
      <div className="relative mt-auto pt-8"><Mock /></div>
      <div className="relative mt-6 font-mono text-[10px] tracking-[0.2em]">
        {proof ? (
          <a href={`#${proof.slug}`} className="inline-flex items-center gap-1.5 text-mute transition-colors hover:text-crimson">
            SEE IT IN {proof.title.toUpperCase()} · {proof.kind} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="text-mute/60">FIGMA WIREFRAMES &amp; PROTOTYPES</span>
        )}
      </div>
    </article>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-0 h-[480px] w-[720px] max-w-full rounded-full bg-crimson/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-gutter">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.25em]">
          <span className="text-crimson">02</span>
          <span aria-hidden className="h-3 w-px bg-white/15" />
          <span className="text-mute">CAPABILITIES</span>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="text-[clamp(3.25rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-white lg:col-span-7">
            What I <span className="font-serif font-normal italic tracking-normal text-crimson">can do</span>
          </h2>
          <p className="max-w-[52ch] text-lg leading-relaxed lg:col-span-5 lg:pb-3">
            From the database schema to the screen in someone&apos;s hand, I build the whole product: web portals, mobile apps and the backend that connects them, planned first in Figma.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {CAPABILITIES.map((c) => <CapabilityCard key={c.n} c={c} />)}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <SectionHead index="03" label="SELECTED WORK" ghost="WORK" title="Web portals, mobile apps and prototypes, built end to end." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const [filter, setFilter] = useState('all');
  return (
    <section id="stack" className="scroll-mt-24 py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <SectionHead index="04" label="STACK & PROCESS" ghost="STACK" title="The tools I reach for, and the order I use them in." />

        <div role="tablist" aria-label="Filter stack" className="mb-6 flex flex-wrap gap-2">
          {[{ key: 'all', label: 'All' }, ...STACK].map((c) => (
            <button key={c.key} role="tab" aria-selected={filter === c.key} onClick={() => setFilter(c.key)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.15em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson ${filter === c.key ? 'border-crimson bg-crimson text-white' : 'border-white/10 text-mute hover:border-white/30 hover:text-white'}`}>
              {c.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {STACK.map((c) => {
            const on = filter === 'all' || filter === c.key;
            const Icon = c.icon;
            return (
              <div key={c.key}
                className={`group min-w-0 rounded-2xl border p-5 md:p-6 transition duration-300 ${c.span} ${c.key === 'core' || c.key === 'tools' ? 'md:col-span-2' : ''} ${on ? 'border-white/10 bg-white/[0.04] opacity-100' : 'border-white/5 bg-white/[0.015] opacity-35'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-crimson" />
                    <span className="font-mono text-[11px] tracking-[0.2em] text-white">{c.label.toUpperCase()}</span>
                  </div>
                  <span className="font-mono text-[10px] text-mute/60 tabular-nums">{String(c.items.length).padStart(2, '0')}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.items.map((s) => (
                    <span key={s}
                      className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-mute transition duration-200 hover:-translate-y-0.5 hover:border-crimson hover:bg-crimson/15 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.6)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-mute">
          <Terminal className="h-4 w-4 text-crimson" /> WORK PROCESS
        </div>
        <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s) => (
            <li key={s.n} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-crimson/40">
              <span className="font-display text-6xl leading-none text-white/10 transition-colors group-hover:text-crimson">{s.n}</span>
              <h3 className="mt-6 text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Info() {
  return (
    <section id="info" className="scroll-mt-24 py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <SectionHead index="05" label="EDUCATION & CREDENTIALS" ghost="INFO" title="Trained in mobile and web application development." />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-4">
            <span aria-hidden className="absolute -right-4 -top-6 font-display text-[9rem] leading-none text-white/[0.04]">NU</span>
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-crimson">
              <GraduationCap className="h-4 w-4" /> EDUCATION
            </div>
            <h3 className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight text-white">National University Dasmariñas</h3>
            <p className="mt-2 text-mute">BS in Information Technology</p>
            <div className="mt-6 inline-flex flex-wrap gap-2">
              <Pill active>Specialization · Mobile &amp; Web App Development</Pill>
              <Pill>Cavite, PH</Pill>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {CERTS.map((c) => (
              <div key={c.title} className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-crimson/40">
                <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-crimson">
                  <BadgeCheck className="h-4 w-4" /> CERTIFICATION
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-1 font-mono text-[11px] tracking-wider text-mute">{c.issuer}</p>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-[10px] tracking-[0.2em] text-mute/70">EXAM SCORE</span>
                    <span className="text-white tabular-nums"><span className="text-2xl">{c.score}</span><span className="text-mute">/{c.max}</span></span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-crimson" style={{ width: `${(c.score / c.max) * 100}%` }} />
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-3 gap-3 font-mono text-[10px] tracking-[0.15em]">
                  {[['AWARDED', c.awarded], ['EXPIRES', c.expires], ['CODE', c.code]].map(([k, v]) => (
                    <div key={k} className="min-w-0">
                      <dt className="text-mute/60">{k}</dt>
                      <dd className="mt-1 break-words text-white select-all">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href={c.href} target="_blank" rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-crimson/60 px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-white transition hover:bg-crimson">
                  [ ❰ Verify Certificate ❱ ]
                </a>
                <p className="mt-2 font-mono text-[10px] tracking-wider text-mute/60">Enter code {c.code} at verify.certiport.com</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 pt-24 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-crimson/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px] px-gutter">
        <div className="font-mono text-[11px] tracking-[0.2em] text-crimson">06 — CONTACT</div>
        <h2 className="mt-5 font-display text-[clamp(3rem,10.5vw,10rem)] leading-[0.88] text-white [text-wrap:balance]">
          LET&apos;S CREATE SOMETHING <span className="text-crimson">EXTRAORDINARY</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-2 lg:col-span-3">
            <CopyRow icon={Mail} label="EMAIL" value={PROFILE.email} />
            <CopyRow icon={Phone} label="PHONE" value={PROFILE.phone} />
            <CopyRow icon={Github} label="GITHUB" value={`github.com/${PROFILE.githubHandle}`} href={PROFILE.github} />
            <div className="flex items-center gap-4 py-4">
              <MapPin className="h-4 w-4 text-crimson" />
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-mute/70">LOCATION</div>
                <span className="text-white">{PROFILE.location} · GMT+8</span>
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:col-span-3">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-white">
                <Github className="h-4 w-4 text-crimson" /> COMMIT ACTIVITY
              </div>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-mute hover:text-white">
                @{PROFILE.githubHandle} <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <ContributionGrid />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 py-8 font-mono text-[10px] tracking-[0.2em] text-mute/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {PROFILE.name.toUpperCase()}</span>
          <span className="flex items-center gap-2"><PenTool className="h-3 w-3" /> DESIGNED &amp; BUILT IN REACT + TAILWIND</span>
          <a href="#hero" onClick={go('hero')} className="hover:text-white">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- project detail page (opened via #slug) ---------- */

function TechChip({ name }) {
  const logo = TECH_LOGOS[LOGO_FOR[name.toLowerCase()]];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/90 transition duration-200 hover:-translate-y-0.5 hover:border-crimson hover:bg-crimson/15">
      {logo ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" style={{ fill: logo.hex }}><path d={logo.path} /></svg>
      ) : (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-crimson" />
      )}
      {name}
    </span>
  );
}

function Showcase({ p }) {
  if (p.shot === 'web') {
    const host = p.live ? p.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${p.slug}.local`;
    return (
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_40px_120px_-30px_rgba(220,38,38,0.35)]">
        <div className="flex h-9 items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-center font-mono text-[11px] text-mute">{host}</span>
        </div>
        <img src={p.image} alt={`${p.title} ${p.sub.toLowerCase()} screenshot`} className="block w-full" />
      </div>
    );
  }
  return (
    <div className="relative flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(80%_70%_at_50%_100%,rgba(220,38,38,0.28),transparent_70%)] px-6 pt-10 pb-0">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <div className={`relative w-[min(78%,340px)] overflow-hidden ${p.bezel ? 'rounded-[2.6rem] border-[9px] border-[#1b1b1d] bg-black ring-1 ring-white/15' : 'rounded-[9%/4.2%]'} shadow-[0_30px_80px_rgba(0,0,0,0.9)]`}>
        {p.bezel && <span aria-hidden className="absolute left-1/2 top-2.5 z-10 h-5 w-[30%] -translate-x-1/2 rounded-full bg-black" />}
        <img src={p.image} alt={`${p.title} ${p.sub.toLowerCase()} screen`} className="block w-full" />
      </div>
    </div>
  );
}

function ProjectPage({ p }) {
  const d = p.details;
  const sibling = PROJECTS.find((x) => x.title === p.title && x.slug !== p.slug);
  return (
    <div className="relative min-h-screen bg-obsidian font-sans text-mute antialiased selection:bg-crimson selection:text-white">
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.06]" />
      <header className="fixed inset-x-0 z-50 flex justify-center px-gutter" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}>
        <nav className="flex w-full max-w-[1400px] items-center justify-between gap-4 rounded-full border border-white/10 bg-black/50 py-2 pl-5 pr-2 backdrop-blur-xl">
          <a href="#hero" className="font-display text-xl tracking-wide text-white">DAD<span className="text-crimson">.</span></a>
          <span className="hidden font-mono text-[11px] tracking-[0.15em] text-mute md:block">PROJECT {p.id} / {String(PROJECTS.length).padStart(2, '0')}</span>
          <a href="#work" className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-white transition hover:border-crimson hover:text-crimson">
            ← ALL WORK
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] px-gutter pt-32 pb-24 md:pt-40">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em]">
          <span className="text-crimson">{p.id}</span>
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-mute">{p.kind}</span>
          <span className="text-mute">{p.sub.toUpperCase()}</span>
          {p.live && (
            <span className="inline-flex items-center gap-1.5 text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
              </span>
              LIVE
            </span>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7">
            <h1 className="font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.86] text-white [text-wrap:balance]">
              {p.title.toUpperCase()}
            </h1>
            <p className="mt-4 text-xl text-white/80">{d.tagline}</p>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <p className="max-w-[60ch] text-[15px] leading-relaxed">{d.overview}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-3 font-mono text-[12px] tracking-wider text-white transition hover:bg-white hover:text-black">
                  [ View Live <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> ]
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-mono text-[12px] tracking-wider text-white transition hover:border-crimson hover:text-crimson">
                  <Github className="h-4 w-4" /> [ Source Code ]
                </a>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 font-mono md:grid-cols-4">
          {d.facts.map(([k, v]) => (
            <div key={k} className="min-w-0 bg-obsidian p-5">
              <dt className="text-[10px] tracking-[0.2em] text-mute/70">{k}</dt>
              <dd className="mt-2 text-sm text-white">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12"><Showcase p={p} /></div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-4">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-crimson">KEY FEATURES</h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              {d.features.map(([t, s]) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  <div className="min-w-0">
                    <div className="font-medium text-white">{t}</div>
                    <p className="mt-1 text-sm leading-relaxed">{s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-2">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-crimson">PROGRAMMING LANGUAGES</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {d.languages.map((l) => <TechChip key={l} name={l} />)}
            </div>
            {d.roles && (
              <>
                <h2 className="mt-8 font-mono text-[11px] tracking-[0.2em] text-crimson">USER ROLES</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {d.roles.map(([r, s]) => (
                    <li key={r}><span className="text-white">{r}</span> — {s}</li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-6">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-crimson">TOOLS, FRAMEWORKS &amp; LIBRARIES</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {d.tools.map(([group, items]) => (
                <div key={group} className="min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-mute/70">{group.toUpperCase()}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((t) => <TechChip key={t} name={t} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {d.data && (
            <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-6">
              <h2 className="font-mono text-[11px] tracking-[0.2em] text-crimson">BACKEND &amp; DATA</h2>
              <p className="mt-4 max-w-[75ch] text-sm leading-relaxed">{d.data}</p>
            </section>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {sibling ? (
            <a href={`#${sibling.slug}`} className="group inline-flex items-center gap-3 text-white">
              <span className="font-mono text-[11px] tracking-[0.2em] text-mute">ALSO BUILT</span>
              <span className="text-lg font-semibold group-hover:text-crimson">{sibling.title} — {sibling.sub}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : <span />}
          <a href="#contact" className="font-mono text-[11px] tracking-[0.2em] text-mute hover:text-white">LET&apos;S TALK ABOUT THIS PROJECT →</a>
        </div>
      </main>
    </div>
  );
}

export default function Portfolio() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1));
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const project = PROJECTS.find((p) => p.slug === route);

  useEffect(() => {
    document.title = project ? `${project.title} — ${project.sub} · Dwight Angelo Decena` : 'Dwight Angelo Decena — Portfolio';
    if (project) window.scrollTo(0, 0);
    else if (route) document.getElementById(route)?.scrollIntoView();
  }, [project, route]);

  if (project) return <ProjectPage p={project} />;
  return <Home />;
}

function Home() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), 'contact'];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id === 'contact' ? 'info' : e.target.id);
      }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian font-sans text-mute antialiased selection:bg-crimson selection:text-white">
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.06]" />
      <Header active={active} />
      <main>
        <Hero />
        <Capabilities />
        <Work />
        <Stack />
        <Info />
      </main>
      <Contact />
    </div>
  );
}
