import { Eta } from "eta"

const eta = new Eta({ views: "./resources/view/" })

export function view(file: string, data: Object){
	return eta.render(`${file}.eta.html`, data)
}
