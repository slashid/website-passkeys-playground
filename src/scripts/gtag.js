import { loadScript } from '../common/utils/dom'

//Will return a full year from set date
function getDateFromToday() {
  return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
}

//DOM elements
const cookieBanner = document.getElementById('cookie-consent')
const acceptButton = document.getElementById('accept-button')
const rejectButton = document.getElementById('reject-button')

//Consent Handlers
function handleAccept() {
  window.gtag('consent', 'update', {
    adStorage: 'granted',
    analyticsStorage: 'granted',
  })

  document.cookie = `_slashIDCookie=true; expires=${getDateFromToday()}`
  cookieBanner.style.display = 'none'
}

function handleReject() {
  window.gtag('consent', 'update', {
    adStorage: 'denied',
    analyticsStorage: 'granted',
  })

  document.cookie = `_slashIDCookie=false; expires=${getDateFromToday()}`
  cookieBanner.style.display = 'none'
}

//Config gtag after load
function gtagConfig(id) {
  window.dataLayer = window.dataLayer || []

  function gtag() {
    // eslint-disable-next-line no-undef
    dataLayer.push(arguments)
  }

  window.gtag = gtag

  window.gtag('js', new Date())

  window.gtag('config', id, {
    pagePath: window.location.href,
  })
}

//Will decode the _slashIDCookie (true/false)
function getDecodedCookie() {
  let decodedCookie = decodeURIComponent(document.cookie)
  decodedCookie = decodedCookie.split(';')

  decodedCookie = decodedCookie.find((cookie) => {
    return cookie.includes('_slashIDCookie')
  })

  return decodedCookie
}

//Consent handler based on Cookie
function handleConsent(decodedCookie) {
  if (decodedCookie) {
    const cookieValue = decodedCookie.split('=')[1]

    //Renovate consent
    if (cookieValue === 'true') {
      window.gtag('consent', 'update', {
        adStorage: 'granted',
        analyticsStorage: 'granted',
      })
    }

    cookieBanner.style.display = 'none'
    return
  } else {
    //Show the banner
    cookieBanner.style.display = 'block'

    //Add handlers to Accept/Reject Buttons
    acceptButton.addEventListener('click', handleAccept)
    rejectButton.addEventListener('click', handleReject)
  }
}

async function setup() {
  const GTAG_ID = 'G-XK1TVPK955'

  await loadScript(
    'gtag',
    `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`
  )

  gtagConfig(GTAG_ID)

  handleConsent(getDecodedCookie())
}

setup()
