import { Hono, Context } from 'hono'
import { hash, genSalt, compare } from "bcryptjs";
import { sign, verify } from 'hono/jwt'
import { config } from "@app/helpers/index.ts";
import { Users } from "@app/db/schema/users.ts";
import { conn } from "@app/db/conn.ts";
import { eq } from "drizzle-orm";
import { info } from "node:console";

const LoginApp = new Hono()

LoginApp.get('/', (c: Context) => {
	return c.json({
		login: "index"
	})
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyaWNhcmRvQGdtYWlsLmNvbSIsImlzcyI6Im15LWFwcCIsImV4cCI6MTc1MTczNjYyMX0.bsvoRXLOOwSNqU_SBCG3hO012c14IA1pSeFN8jwy6Gk
LoginApp.get('/check/:email', async (c: Context) => {
	const _email = c.req.param('email')
	const token = c.req.query('token')
	const users = await conn.select().from(Users).where(eq(Users.email, _email))

	for(let x:string in Users){
		console.info('--->', x)
		console.info('----->', Users[x].dataType)
	}

	console.info(Users)

	let is_valid = false

	if(users.length > 0 && users[0].email == _email){
		is_valid = true
	}

	let dpayload = null

	try {
		dpayload = await verify(token!, config('APP_SECRET')!)
	} catch (error) {
		console.log(`[JWT] token invalid: ${error}`);
	}

	return c.json({
		login: "check",
		email: _email,
		token,
		is_valid,
		tokenVerified: (dpayload == null ? null : true)
	})
})

LoginApp.get('/new', async (c: Context) => {

	const email = 'ricardo@gmail.com'
	const password = '1234567'

	const salt = await genSalt(10)
	const hashedPassword = await hash(password, salt)

	const payload = {
		sub: email,
		iss: 'my-app',
		exp: Math.floor(Date.now() / 1000) + 60 * 5
	}

	const token = await sign(payload, config('APP_SECRET')!)
	let dpayload = null

	try {
		dpayload = await verify(token, config('APP_SECRET')!)
	} catch (error) {
		console.log(`[JWT] token invalid: ${error}`);
	}

	await conn.insert(Users).values({
		email,
		password: hashedPassword
	})

	return c.json({
		login: 'new',
		email,
		hashedPassword,
		compare: await compare(password, hashedPassword),
		token,
		tokenVerified: (dpayload == null ? null : true)
	})
})

export default LoginApp
