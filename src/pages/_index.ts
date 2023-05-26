import { loadScript } from '@common/utils/dom'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slashid: any
  }
}

const SLASHID_ORG_ID = 'dbf9d123-32e8-3be4-b3e1-c79938cc8f8d'

function changeState(
  state: 'idle' | 'loading' | 'loading-auth' | 'success' | 'error'
) {
  const section = document.getElementById('form-wrapper')

  section?.setAttribute('data-state', state)
}

function toggleAdvancedSettings() {
  const settings = document.getElementById('advanced-settings')
  const display = settings?.getAttribute('data-display')
  settings?.setAttribute(
    'data-display',
    display === 'visible' ? 'hidden' : 'visible'
  )
}

function setupForm() {
  const sid = new window.slashid.SlashID()
  const form = document.getElementById('request-access-form')

  if (!form) throw new Error()

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    changeState('loading')

    try {
      const values = getValues(e)

      if (!values) throw new Error()

      const { email, ...options } = values

      sid.subscribe(
        'webAuthnChallengeProcessed',
        (e: { credentialId: string }) => {
          const id = document.getElementById('credential-id')
          if (id) {
            id.innerText = e.credentialId
          }
        }
      )

      await sid.id(
        SLASHID_ORG_ID,
        {
          type: 'email_address',
          value: email,
        },
        {
          method: 'webauthn',
          options,
        }
      )

      changeState('success')
    } catch (error) {
      changeState('error')
    }
  })

  const advancedSettingsForm = document.getElementById('advanced-settings-form')
  if (!advancedSettingsForm) throw new Error()

  advancedSettingsForm.addEventListener('click', (e) => {
    e.preventDefault()
    toggleAdvancedSettings()
  })
}

function getValues(e: SubmitEvent) {
  if (!e.target || !(e.target instanceof HTMLFormElement)) return null

  const email = e.target.elements.namedItem('email')
  const attachment = e.target.elements.namedItem('attachment')
  const user_verification = e.target.elements.namedItem('user_verification')
  const resident_key = e.target.elements.namedItem('resident_key')
  const attestation = e.target.elements.namedItem('attestation')

  let emailVal = ''
  let attachmentVal = ''
  let userVerificationVal = ''
  let residentKeyVal = ''
  let attestationVal = ''

  if (email instanceof HTMLInputElement) {
    emailVal = email.value
  }
  if (attachment instanceof HTMLSelectElement) {
    attachmentVal = attachment.value
  }

  if (user_verification instanceof HTMLSelectElement) {
    userVerificationVal = user_verification.value
  }

  if (resident_key instanceof HTMLSelectElement) {
    residentKeyVal = resident_key.value
  }

  if (attestation instanceof HTMLSelectElement) {
    attestationVal = attestation.value
  }

  if (!(email instanceof HTMLInputElement)) {
    return null
  }

  return {
    email: emailVal,
    attachment: attachmentVal,
    user_verification: userVerificationVal,
    resident_key: residentKeyVal,
    attestation: attestationVal,
  }
}

async function setup() {
  await loadScript('slashid', 'https://cdn.slashid.com/slashid.js')

  setupForm()
}

setup()
