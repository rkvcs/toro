import { Hono } from "hono";
import { serveStatic } from 'hono/deno'
import { config, view, loadPackages } from "@app/helpers/index.ts";

const app = new Hono();

app.use('*', serveStatic({ "root": "./public" }))

app.get("/", (c) => {
	return c.html(view('pages/home', {
		name: config('APP_NAME')
	}))
});

loadPackages(app)

Deno.serve(app.fetch);
