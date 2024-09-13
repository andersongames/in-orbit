import fastfy from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import { undoCompletionRoute } from './routes/undo-completion'

const app = fastfy().withTypeProvider<ZodTypeProvider>()

// setup cors
app.register(fastifyCors, {
  origin: '*', // any url
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// register plugins/midleware
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(undoCompletionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server runing!')
  })
