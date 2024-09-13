export async function undoGoalCompletion(goalCompletionId: string) {
  await fetch('http://localhost:3333/undo-completions', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      goalCompletionId,
    }),
  })
}
