import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { UndoGoalCompletion } from '../../functions/undo-goal-completion'

export const undoCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/undo-completions',
    {
      schema: {
        body: z.object({
          goalCompletionId: z.string(),
        }),
      },
    },
    async request => {
      const { goalCompletionId } = request.body

      await UndoGoalCompletion({
        goalCompletionId,
      })
    }
  )
}
