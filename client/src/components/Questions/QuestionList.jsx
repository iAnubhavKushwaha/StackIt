import QuestionItem from './QuestionItem';

function QuestionList({ questions, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Make sure questions is an array before mapping
  const questionsArray = Array.isArray(questions) ? questions : [];

  if (questionsArray.length === 0) {
    return (
      <div className="card text-center py-8">
        <p>No questions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questionsArray.map(question => (
        <QuestionItem key={question._id} question={question} />
      ))}
    </div>
  );
}

export default QuestionList;