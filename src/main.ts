import { Hono } from "hono";
import { serveStatic } from 'hono/deno'
import { config, view, loadPackages } from "@app/helpers/index.ts";
import {
  matchedRoutes,
  routePath,
  baseRoutePath,
  basePath,
} from 'hono/route'


const app = new Hono();

app.use('*', serveStatic({ "root": "./public" }))

loadPackages(app)

app.get("/", (c) => {
	const routes = matchedRoutes(c)

	console.info(routes)

	return c.html(view('pages/home', {
		name: config('APP_NAME')
	}))
});

Deno.serve(app.fetch);
