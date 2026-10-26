/* ==========================================================================
   AUTHENTIC ENTERPRISE BRAND LOGOS (SVG DEFINITIONS)
   n8n, Microsoft Power Automate, Copilot Studio, SAP Joule, OpenAI, etc.
   ========================================================================== */

const BRAND_LOGOS = {
  n8n: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#FF6D5A"/>
      <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="20" r="3.5" fill="white"/>
      <circle cx="12" cy="20" r="2.5" fill="#FFE2DD"/>
      <circle cx="28" cy="20" r="2.5" fill="#FFE2DD"/>
      <circle cx="20" cy="28" r="2.5" fill="#FFE2DD"/>
      <path d="M20 23.5V25.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M14.5 20H16.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M23.5 20H25.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  powerAutomate: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0066B8"/>
      <path d="M11 26.5L18.5 13.5H23L15.5 26.5H11Z" fill="#50E6FF"/>
      <path d="M17.5 26.5L25 13.5H29.5L22 26.5H17.5Z" fill="#00A3EE"/>
      <path d="M16 26.5C18.5 26.5 20.5 24.5 20.5 22C20.5 19.5 18.5 17.5 16 17.5C13.5 17.5 11.5 19.5 11.5 22C11.5 24.5 13.5 26.5 16 26.5Z" fill="#0078D4"/>
      <path d="M18.5 26.5L25 15.5L27 19L22.5 26.5H18.5Z" fill="#185ABD"/>
    </svg>
  `,

  copilotStudio: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="copilotGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0078D4"/>
          <stop offset="50%" stop-color="#8661C5"/>
          <stop offset="100%" stop-color="#FF5D8F"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="#1E1E2E"/>
      <path d="M13 18C13 13.5 16.5 10 21 10C24.5 10 27.5 12.5 28.5 16H23.5C21 16 19 18 19 20.5V25H16C14.3 25 13 23.7 13 22V18Z" fill="url(#copilotGrad1)"/>
      <path d="M27 22C27 26.5 23.5 30 19 30C15.5 30 12.5 27.5 11.5 24H16.5C19 24 21 22 21 19.5V15H24C25.7 15 27 16.3 27 18V22Z" fill="#00D2B4"/>
      <circle cx="26" cy="14" r="2.5" fill="#FFC83B"/>
    </svg>
  `,

  sapJoule: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jouleGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#FDE047"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="#0F172A"/>
      <path d="M10 28H14.5L17.5 12H13L10 28Z" fill="#0A6ED1"/>
      <path d="M20 9L27 16L20 23L13 16L20 9Z" fill="url(#jouleGrad)" opacity="0.9"/>
      <circle cx="20" cy="16" r="3.5" fill="#FFFFFF"/>
      <path d="M24 20L30 26L24 32L18 26L24 20Z" fill="#F59E0B" opacity="0.8"/>
      <text x="21" y="32" font-family="'Outfit', sans-serif" font-size="7" font-weight="900" fill="#FFFFFF">JOULE</text>
    </svg>
  `,

  sap: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0A6ED1"/>
      <text x="20" y="25" font-family="'Outfit', sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">SAP</text>
    </svg>
  `,

  openai: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#10A37F"/>
      <path d="M28.5 19.3c-.2-2.3-1.8-4.2-4.1-4.7-.5-1.9-2.1-3.3-4.1-3.6-2.2-.4-4.4.6-5.5 2.5-1.9-.3-3.8.7-4.6 2.5-.9 1.8-.5 3.9.9 5.2-.2 2.3 1.4 4.3 3.7 4.9.5 1.9 2.1 3.3 4.1 3.6 2.2.4 4.4-.6 5.5-2.5 1.9.3 3.8-.7 4.6-2.5 1-1.8.6-3.9-.5-5.4z" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="20" cy="20" r="3" fill="white"/>
    </svg>
  `,

  claude: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#D97706"/>
      <path d="M14 26L20 12L26 26H22.5L20 19L17.5 26H14Z" fill="#FFFFFF"/>
      <circle cx="20" cy="15" r="2.5" fill="#FEF3C7"/>
    </svg>
  `,

  apify: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#1E293B"/>
      <path d="M20 9L29 14.2V24.8L20 30L11 24.8V14.2L20 9Z" stroke="#00E676" stroke-width="2.5" fill="none"/>
      <circle cx="20" cy="19.5" r="4.5" fill="#00E676"/>
    </svg>
  `,

  airtable: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#18BFFF"/>
      <path d="M20 10L11 15V24L20 19V10Z" fill="#F8FAFC"/>
      <path d="M20 10L29 15V24L20 19V10Z" fill="#CBD5E1"/>
      <path d="M20 21L11 26L20 31L29 26L20 21Z" fill="#F59E0B"/>
    </svg>
  `,

  telegram: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#229ED9"/>
      <path d="M12 20.5L27 14L23 27L18.5 22.5L22 18L16 21.5L12 20.5Z" fill="white"/>
    </svg>
  `,

  whatsapp: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#25D366"/>
      <path d="M20 11C15 11 11 15 11 20C11 21.8 11.5 23.4 12.4 24.8L11 29L15.4 27.6C16.8 28.5 18.3 29 20 29C25 29 29 25 29 20C29 15 25 11 20 11ZM24.5 23.5C24.3 24 23.4 24.5 22.9 24.5C22.5 24.5 22 24.4 20.1 23.6C17.7 22.6 16.1 20.2 16 20.1C15.9 19.9 15 18.7 15 17.5C15 16.3 15.6 15.7 15.9 15.4C16.1 15.2 16.4 15.1 16.7 15.1C16.8 15.1 16.9 15.1 17 15.1C17.3 15.1 17.4 15.1 17.6 15.5C17.8 16 18.3 17.2 18.4 17.3C18.5 17.4 18.5 17.5 18.4 17.6C18.3 17.8 18.2 17.9 18.1 18C18 18.1 17.9 18.2 17.8 18.4C17.6 18.5 17.5 18.7 17.7 19C17.9 19.3 18.6 20.5 19.6 21.4C20.9 22.5 22 22.9 22.3 23C22.6 23.1 22.8 23.1 23 22.9C23.2 22.6 23.7 22 23.9 21.7C24.1 21.4 24.3 21.5 24.5 21.5C24.7 21.6 25.9 22.2 26.1 22.3C26.3 22.4 26.5 22.5 26.6 22.6C26.6 22.8 26.6 23.2 26.4 23.5H24.5Z" fill="white"/>
    </svg>
  `,

  zendesk: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#03363D"/>
      <path d="M12 14H20V22L12 14Z" fill="#17494D"/>
      <circle cx="24" cy="18" r="4" fill="#00E676"/>
      <circle cx="16" cy="22" r="4" fill="#FFFFFF"/>
      <path d="M20 26V18L28 26H20Z" fill="#17494D"/>
    </svg>
  `,

  webhook: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#FF4081"/>
      <path d="M20 12C15.6 12 12 15.6 12 20C12 24.4 15.6 28 20 28C24.4 28 28 24.4 28 20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="20" cy="20" r="3" fill="white"/>
      <circle cx="12" cy="20" r="2" fill="white"/>
      <circle cx="28" cy="20" r="2" fill="white"/>
      <circle cx="20" cy="28" r="2" fill="white"/>
    </svg>
  `,

  postgres: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#336791"/>
      <path d="M20 10C14.5 10 11 14 11 19.5C11 25.5 15.5 29.5 19.5 29.5C21 29.5 22.5 29 23.5 28C24.5 29 26 29.5 27.5 29.5C28.5 29.5 29 29.2 29 29.2L27.5 26.5C27 26.5 26.5 26.2 26 25.5C28 23.5 29 21.5 29 19.5C29 14 25.5 10 20 10Z" fill="white"/>
      <circle cx="17" cy="17" r="1.5" fill="#336791"/>
    </svg>
  `,

  ifNode: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#00D2B4"/>
      <path d="M12 20H18C20 20 22 18 22 16V13M22 13L19 16M22 13L25 16" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 20C20 20 22 22 22 24V27M22 27L19 24M22 27L25 24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  respondWebhook: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#FF4081"/>
      <path d="M13 24L19 18M19 18H14M19 18V23" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="18" y="14" width="10" height="12" rx="2" stroke="white" stroke-width="2"/>
    </svg>
  `,

  switchNode: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#38BDF8"/>
      <path d="M11 20H17M17 20C19 20 21 16 23 14H29M17 20H29M17 20C19 20 21 24 23 26H29" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="29" cy="14" r="1.5" fill="white"/>
      <circle cx="29" cy="20" r="1.5" fill="white"/>
      <circle cx="29" cy="26" r="1.5" fill="white"/>
    </svg>
  `,

  executeWorkflow: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#F97316"/>
      <rect x="12" y="12" width="14" height="14" rx="3" stroke="white" stroke-width="2.2"/>
      <path d="M22 18L27 12M27 12H23M27 12V16" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  mergeNode: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#14B8A6"/>
      <path d="M12 14H18C20 14 22 18 24 20H28M12 26H18C20 26 22 22 24 20M28 20L25 17M28 20L25 23" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  slack: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#4A154B"/>
      <path d="M16 11.5c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5h2.5v-2.5zm-5 6.2c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5h6.2v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3.7z" fill="#E01E5A"/>
      <path d="M20.2 11.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v6.2h-2.5c-1.4 0-2.5-1.1-2.5-2.5v-3.7zm6.2 5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5-2.5 1.1-2.5 2.5v2.5h2.5z" fill="#36C5F0"/>
      <path d="M23.9 28.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5h-2.5v2.5zm5-6.2c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5h-6.2v2.5c0 1.4 1.1 2.5 2.5 2.5h3.7z" fill="#2EB67D"/>
      <path d="M19.8 28.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5v-6.2h2.5c1.4 0 2.5 1.1 2.5 2.5v3.7zm-6.2-5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5v-2.5h-2.5z" fill="#ECB22E"/>
    </svg>
  `,

  waitNode: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#8B5CF6"/>
      <path d="M13 13H27M13 27H27M15 13C15 19 20 20 20 20C20 20 25 19 25 13M15 27C15 21 20 20 20 20C20 20 25 21 25 27" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  cron: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#6366F1"/>
      <circle cx="20" cy="20" r="10" stroke="white" stroke-width="2.5" fill="none"/>
      <path d="M20 14V20L24 22" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  googleDocs: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#4285F4"/>
      <path d="M14 12H22L27 17V28H14V12Z" fill="white"/>
      <path d="M22 12V17H27" fill="#CBD5E1"/>
      <path d="M17 19H23M17 22H23M17 25H21" stroke="#4285F4" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  sheets: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#0F9D58"/>
      <path d="M14 12H22L27 17V28H14V12Z" fill="white"/>
      <path d="M22 12V17H27" fill="#CBD5E1"/>
      <path d="M17 21H24M17 24H24M20 19V26" stroke="#0F9D58" stroke-width="1.5"/>
    </svg>
  `,

  jira: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#0052CC"/>
      <path d="M19.8 11.5L25 16.7C26 17.7 26 19.3 25 20.3L19.8 25.5C18.8 26.5 17.2 26.5 16.2 25.5L11 20.3C10 19.3 10 17.7 11 16.7L16.2 11.5C17.2 10.5 18.8 10.5 19.8 11.5Z" fill="white"/>
      <path d="M22.5 18.5L27.7 23.7C28.7 24.7 28.7 26.3 27.7 27.3L22.5 32.5C21.5 33.5 19.9 33.5 18.9 32.5L13.7 27.3" stroke="#2684FF" stroke-width="2.5" fill="none"/>
    </svg>
  `,

  chroma: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#18181B"/>
      <circle cx="15" cy="16" r="4.5" fill="#EC4899"/>
      <circle cx="25" cy="16" r="4.5" fill="#3B82F6"/>
      <circle cx="20" cy="25" r="4.5" fill="#10B981"/>
    </svg>
  `,

  fastapi: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#009688"/>
      <path d="M22 11L14 22H20L18 29L26 18H20L22 11Z" fill="white"/>
    </svg>
  `
};

window.BRAND_LOGOS = BRAND_LOGOS;

