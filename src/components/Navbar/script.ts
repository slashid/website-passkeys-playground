/**
 * Dropdowns
 */
const dropdownTriggers = document.querySelectorAll('.with-dropdown')
const container = document.querySelector('.dropdown-container') as HTMLElement
const nav = document.querySelector('.nav-links')

function onEnter(this: HTMLElement) {
  this.classList.add('show')
  container.classList.add('show')

  const dropdown = this.querySelector('.dropdown')
  const dropdownBoundingRect = dropdown?.getBoundingClientRect()
  const navBoundingRect = nav?.getBoundingClientRect()

  let containerDimentions: {
    width: string
    height: string
    leftOffset: string
    topOffset: string
  }

  if (dropdownBoundingRect && navBoundingRect) {
    containerDimentions = {
      width: `${dropdownBoundingRect.width}px`,
      height: `${dropdownBoundingRect.height - 16}px`,
      leftOffset: `${dropdownBoundingRect.left - navBoundingRect.left}px`,
      topOffset: `${dropdownBoundingRect.top - navBoundingRect.top + 16}px`,
    }

    container.style.setProperty('width', containerDimentions.width)
    container.style.setProperty('height', containerDimentions.height)

    container.style.setProperty(
      'transform',
      `translate(${containerDimentions.leftOffset}, ${containerDimentions.topOffset})`
    )
  }
}

function onLeave(this: HTMLElement) {
  this.classList.remove('show')
  container.classList.remove('show')

  container.style.setProperty('width', '100px')
  container.style.setProperty('height', '100px')
}

dropdownTriggers.forEach((element) => {
  element.addEventListener('mouseenter', onEnter)
  element.addEventListener('mouseleave', onLeave)
})

/**
 * Mobile Menu
 */
const menu = document.querySelector('.mobile-menu-wrapper') as HTMLElement
const body = document.querySelector('body') as HTMLElement

function handleToggle() {
  body.style.overflow === 'hidden'
    ? (body.style.overflow = 'scroll')
    : (body.style.overflow = 'hidden')

  menu.classList.toggle('open')
}

const button = document.getElementById('mobile-menu') as HTMLElement
if (button) {
  button.addEventListener('click', handleToggle)
}

export {}
