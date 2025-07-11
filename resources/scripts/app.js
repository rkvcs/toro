import { Application, Controller } from "#npm/@hotwired/stimulus/dist/stimulus.js"
import HelloController from "./controllers/hello_controller"

window.Stimulus = Application.start();
window.Controller = Controller;

Stimulus.register("hello", HelloController)

console.log(`here`)
