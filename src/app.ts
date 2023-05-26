/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import app from './libs/create-server'

app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000`)
)
console.log(process.env.DATABASE_URL)
