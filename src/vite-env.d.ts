/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_RESPONSE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ASK_ID: string
  readonly VITE_EMAILJS_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 