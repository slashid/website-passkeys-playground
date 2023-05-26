export const getOffsetTop = function (elem: HTMLElement) {
  let distance = 0

  if (elem.parentElement) {
    distance += elem.offsetTop
    getOffsetTop(elem.parentElement)
  }

  return Math.max(0, distance)
}

export const loadScript = (id: string, src: string) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = src

    document.body.appendChild(script)

    // Resolve the promise once the script is loaded
    script.addEventListener('load', () => {
      resolve(script)
    })

    // Catch any errors while loading the script
    script.addEventListener('error', () => {
      reject(new Error(`${src} failed to load.`))
    })
  })
}
