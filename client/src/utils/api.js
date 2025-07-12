import axios from 'axios';

// Questions API
export const getQuestions = async () => {
  try {
    const res = await axios.get('/api/questions');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestionById = async (id) => {
  try {
    const res = await axios.get(`/api/questions/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createQuestion = async (questionData) => {
  try {
    const res = await axios.post('/api/questions', questionData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Answers API
export const getAnswers = async (questionId) => {
  try {
    const res = await axios.get(`/api/answers/question/${questionId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createAnswer = async (answerData) => {
  try {
    const res = await axios.post('/api/answers', answerData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const voteAnswer = async (answerId, voteType) => {
  try {
    const res = await axios.put(`/api/answers/${answerId}/vote`, { voteType });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const acceptAnswer = async (answerId) => {
  try {
    const res = await axios.put(`/api/answers/${answerId}/accept`);
    return res.data;
  } catch (error) {
    throw error;
  }
};