/**
 * useDebugContext - Collecte les informations de debug
 *
 * Fournit un contexte complet pour chaque enregistrement de stats :
 * - Version de l'app
 * - Navigateur et version
 * - OS et version
 * - Type d'appareil
 * - Résolution écran
 * - Timezone et locale
 * - Session ID
 * - État de connexion
 */

export interface DebugContext {
  app_version: string
  browser: string
  browser_version: string
  os: string
  os_version: string
  device_type: 'mobile' | 'tablet' | 'desktop'
  screen_width: number
  screen_height: number
  timezone: string
  locale: string
  session_id: string
  is_online: boolean
  recorded_at: string
}

// Session ID unique pour cette session de navigation
const SESSION_ID_KEY = 'nuxy-session-id'

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

function getSessionId(): string {
  if (typeof window === 'undefined') return 'server'

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY)
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }
  return sessionId
}

/**
 * Parse le User Agent pour extraire navigateur et OS
 */
function parseUserAgent(): {
  browser: string
  browser_version: string
  os: string
  os_version: string
} {
  if (typeof navigator === 'undefined') {
    return {
      browser: 'unknown',
      browser_version: 'unknown',
      os: 'unknown',
      os_version: 'unknown'
    }
  }

  const ua = navigator.userAgent
  let browser = 'unknown'
  let browser_version = 'unknown'
  let os = 'unknown'
  let os_version = 'unknown'

  // Détection du navigateur
  if (ua.includes('Firefox/')) {
    browser = 'Firefox'
    browser_version = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'unknown'
  } else if (ua.includes('Edg/')) {
    browser = 'Edge'
    browser_version = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'unknown'
  } else if (ua.includes('Chrome/')) {
    browser = 'Chrome'
    browser_version = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'unknown'
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browser = 'Safari'
    browser_version = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'unknown'
  } else if (ua.includes('Brave')) {
    browser = 'Brave'
    browser_version = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'unknown'
  }

  // Détection de l'OS
  if (ua.includes('Windows NT')) {
    os = 'Windows'
    const ntVersion = ua.match(/Windows NT (\d+\.\d+)/)?.[1]
    if (ntVersion === '10.0') os_version = '10/11'
    else if (ntVersion === '6.3') os_version = '8.1'
    else if (ntVersion === '6.2') os_version = '8'
    else if (ntVersion === '6.1') os_version = '7'
    else os_version = ntVersion || 'unknown'
  } else if (ua.includes('Mac OS X')) {
    os = 'macOS'
    os_version = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || 'unknown'
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    os = ua.includes('iPad') ? 'iPadOS' : 'iOS'
    os_version = ua.match(/OS (\d+[._]\d+)/)?.[1]?.replace('_', '.') || 'unknown'
  } else if (ua.includes('Android')) {
    os = 'Android'
    os_version = ua.match(/Android (\d+\.\d+)/)?.[1] || 'unknown'
  } else if (ua.includes('Linux')) {
    os = 'Linux'
    os_version = 'unknown'
  }

  return { browser, browser_version, os, os_version }
}

/**
 * Détecte le type d'appareil
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const ua = navigator.userAgent
  const width = window.innerWidth

  // Détection par User Agent
  if (/iPhone|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return 'mobile'
  }
  if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) {
    return 'tablet'
  }

  // Fallback par largeur d'écran
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export const useDebugContext = () => {
  const { public: { appVersion } } = useRuntimeConfig()

  /**
   * Génère le contexte de debug complet
   */
  const getDebugContext = (): DebugContext => {
    const { browser, browser_version, os, os_version } = parseUserAgent()

    return {
      app_version: appVersion || 'unknown',
      browser,
      browser_version,
      os,
      os_version,
      device_type: getDeviceType(),
      screen_width: typeof window !== 'undefined' ? window.innerWidth : 0,
      screen_height: typeof window !== 'undefined' ? window.innerHeight : 0,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
      locale: typeof navigator !== 'undefined' ? navigator.language : 'unknown',
      session_id: getSessionId(),
      is_online: typeof navigator !== 'undefined' ? navigator.onLine : true,
      recorded_at: new Date().toISOString()
    }
  }

  /**
   * Génère un contexte minimal (pour les logs fréquents)
   */
  const getMinimalContext = (): Pick<DebugContext, 'session_id' | 'recorded_at' | 'is_online'> => {
    return {
      session_id: getSessionId(),
      recorded_at: new Date().toISOString(),
      is_online: typeof navigator !== 'undefined' ? navigator.onLine : true
    }
  }

  return {
    getDebugContext,
    getMinimalContext,
    getSessionId
  }
}
