import { Controller } from "#npm/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = [ "name" ]

  greet() {
    let name = document.querySelector('#name')
    name.innerHTML = `Hello <span class="text-pink-800">${this.name}!</span>`
  }

  get name() {
    return this.nameTarget.value
  }
}
