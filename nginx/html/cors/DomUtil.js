class DomUtil {
  constructor(selector) {
    this.element = document.querySelector(selector)
  }
  onClick(callback) {
    this.element.addEventListener('click', callback)
  }
  get value() {
    return this.element.value
  }
}

function $(selector) {
  return new DomUtil(selector)
}
