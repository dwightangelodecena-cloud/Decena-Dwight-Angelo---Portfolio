import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, Mail, Phone, MapPin, Copy, Check, GraduationCap,
  BadgeCheck, Smartphone, Globe, Server, Wrench, Layers, PenTool, Terminal,
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
  },
  {
    id: '02', kind: 'MOBILE', title: 'Bridges of Hope', sub: 'Mobile App',
    desc: 'Cross-platform mobile companion app for patient families to track admissions and receive real-time notifications.',
    stack: ['React Native', 'TypeScript', 'Supabase'],
    repo: 'https://github.com/dwightangelodecena-cloud/-BridgesOfHope---Backup',
    span: 'lg:col-span-2', mono: 'BOH',
    image: '/projects/boh-mobile.webp', shot: 'phone',
  },
  {
    id: '03', kind: 'MOBILE', title: 'Rhayz Kicks', sub: 'Mobile App',
    desc: 'Cross-platform mobile e-commerce application with dynamic store repositories and delivery tracking.',
    stack: ['Flutter', 'Dart', 'Laravel API'],
    repo: 'https://github.com/dwightangelodecena-cloud/RhayzKicks',
    span: 'lg:col-span-2', mono: 'RK',
  },
  {
    id: '04', kind: 'WEB', title: 'Rhayz Kicks', sub: 'Web Platform',
    desc: 'High-performance sneaker e-commerce web platform featuring interactive cart drawers and wishlist management.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel API'],
    live: 'https://rhayz-kicks.vercel.app/',
    repo: 'https://github.com/dwightangelodecena-cloud/RhayzKicks',
    span: 'lg:col-span-4', mono: 'RK',
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
};

const MARQUEE = [
  ['React', 'react'], ['React Native', 'react'], ['TypeScript', 'typescript'],
  ['Flutter', 'flutter'], ['Supabase', 'supabase'], ['Laravel API', 'laravel'],
  ['Tailwind CSS', 'tailwind'], ['Figma', 'figma'], ['MySQL', 'mysql'],
];

const NAV = [
  { id: 'hero', label: '01-HERO' },
  { id: 'work', label: '02-WORK' },
  { id: 'stack', label: '03-STACK' },
  { id: 'info', label: '04-INFO' },
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
        <ul className="hidden items-center gap-1 md:flex">
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
    <article className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-crimson/50 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.25),0_24px_70px_-20px_rgba(220,38,38,0.45)] motion-reduce:transform-none ${p.span}`}>
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
              className="h-[calc(100%-1.5rem)] w-full object-cover object-left-top" />
          </div>
        )}
        {p.shot === 'phone' && (
          <img src={p.image} alt={`${p.title} ${p.sub.toLowerCase()} home screen`} loading="lazy"
            className="absolute left-1/2 top-14 w-[72%] max-w-[320px] -translate-x-1/2 rounded-[9%/4.2%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-2 motion-reduce:transform-none" />
        )}
        <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
          <span className="text-crimson">{p.id}</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-mute">{p.kind}</span>
        </div>
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 font-mono text-[12px] tracking-[0.15em] text-white">
              VIEW LIVE <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        )}
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
        <div className="mt-auto flex flex-wrap gap-4 pt-6 font-mono text-[11px] tracking-[0.15em]">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white hover:text-crimson">
              LIVE <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {p.repo ? (
            <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-mute hover:text-white">
              <Github className="h-3.5 w-3.5" /> SOURCE
            </a>
          ) : (
            <span className="text-mute/50">PRIVATE · ACADEMIC</span>
          )}
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <SectionHead index="02" label="SELECTED WORK" ghost="WORK" title="Web portals, mobile apps and prototypes, built end to end." />
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
        <SectionHead index="03" label="STACK & PROCESS" ghost="STACK" title="The tools I reach for, and the order I use them in." />

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
        <SectionHead index="04" label="EDUCATION & CREDENTIALS" ghost="INFO" title="Trained in mobile and web application development." />
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
        <div className="font-mono text-[11px] tracking-[0.2em] text-crimson">05 — CONTACT</div>
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

export default function Portfolio() {
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
        <Work />
        <Stack />
        <Info />
      </main>
      <Contact />
    </div>
  );
}
