import axios from 'axios';

// Configure axios to include auth token in all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Questions API
export const getQuestions = async () => {
  try {
    const res = await axios.get('/api/questions');
    // Ensure we return an array
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];  // Return empty array on error
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

// Image upload function for standalone use (outside editor)
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const res = await axios.post('/api/uploads/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return res.data.imageUrl;
  } catch (error) {
    throw error;
  }
};