import { eq } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions } from '../db/schema'

interface UndoGoalCompletionRequest {
  goalCompletionId: string
}

export async function UndoGoalCompletion({
  goalCompletionId,
}: UndoGoalCompletionRequest) {
  const result = await db
    .select({
      id: goalCompletions.id,
    })
    .from(goalCompletions)
    .where(eq(goalCompletions.id, goalCompletionId))

  const { id } = result[0]

  await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.id, goalCompletionId))
    .returning()

  return {
    id,
  }
}
