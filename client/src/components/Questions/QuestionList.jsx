import QuestionItem from './QuestionItem';

function QuestionList({ questions, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-zinc-300 border-t-zinc-600 rounded-full"></div>
      </div>
    );
  }

  const questionsArray = Array.isArray(questions) ? questions : [];

  if (questionsArray.length === 0) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl p-6 text-center text-zinc-500 shadow-sm">
        No questions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questionsArray.map((question) => (
        <QuestionItem key={question._id} question={question} />
      ))}
    </div>
  );
}

export default QuestionList;