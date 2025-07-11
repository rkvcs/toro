import { Hono, Context } from 'hono'

const JwtApp = new Hono()

JwtApp.get('/', (c: Context) => {
	return c.json({
		jwt: "hello"
	})
})

export default JwtApp