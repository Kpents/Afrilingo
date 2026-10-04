const DEFAULT_RETRY_GAP = 2;

export function createLessonQueue(questions = []) {
  return questions.map((question, order) => ({ ...question, retry: false, retryAttempt: 0, authoredOrder: order }));
}

export function scheduleAdaptiveRetry(queue, index, question) {
  const retryAttempt = (question.retryAttempt || 0) + 1;
  const withoutFutureDuplicate = queue.filter((item, itemIndex) => itemIndex <= index || item.id !== question.id);
  const remaining = withoutFutureDuplicate.length - index - 1;
  const gap = Math.min(remaining, Math.max(1, DEFAULT_RETRY_GAP - Math.min(1, retryAttempt - 1)));
  const insertionIndex = index + 1 + gap;
  const retry = { ...question, retry: true, retryAttempt };
  return [
    ...withoutFutureDuplicate.slice(0, insertionIndex),
    retry,
    ...withoutFutureDuplicate.slice(insertionIndex)
  ];
}

export function lessonMasterySummary(results = []) {
  const concepts = new Map();
  results.forEach(result => {
    const previous = concepts.get(result.questionId) || { attempts: 0, correct: false, recovered: false };
    concepts.set(result.questionId, {
      attempts: previous.attempts + 1,
      correct: result.correct || previous.correct,
      recovered: previous.recovered || (result.correct && result.retryAttempt > 0)
    });
  });
  const values = [...concepts.values()];
  return {
    concepts: values.length,
    secure: values.filter(item => item.correct).length,
    recovered: values.filter(item => item.recovered).length,
    attempts: results.length
  };
}
