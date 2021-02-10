const formatQuestion = (question) => {
  const formatter = {
    id: question.id,
    name: question.name,
    email: question.email,
    body: question.body,
  };
  return formatter;
};

const formatQuestions = (questions) =>
  questions.map((question) => formatQuestion(question));

module.exports = {formatQuestion, formatQuestions};
