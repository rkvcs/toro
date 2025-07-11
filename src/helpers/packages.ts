import { INSTALLED_PKGS } from "@app/register.ts";
import { Hono } from "hono";

export function loadPackages(app: Hono){
  INSTALLED_PKGS.forEach( async(item) => {
		const _routes = await import("@app/pkgs/"+item.package+"/routes.ts")
		app.route(item.path, _routes.default)
	})
}
