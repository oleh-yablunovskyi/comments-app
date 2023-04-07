/* eslint-disable no-console */
import axios from 'axios';
import { CommentType } from '../types/CommentType';

// const BASE_URL = 'https://comments-app-server.onrender.com';
const BASE_URL = 'http://localhost:5000';

const getTopComments = async (): Promise<CommentType[]> => {
  const response = await axios
    .get(`${BASE_URL}/comments`);

  return response.data;
};

const getChildrenCommentsByID = async (id: number): Promise<CommentType[]> => {
  const response = await axios
    .get(`${BASE_URL}/comments/${id}/children`);

  return response.data;
};

const createComment = async (payload: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/comments`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Comment submitted successfully', response.data);
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

export const commentsApi = {
  getTopComments,
  getChildrenCommentsByID,
  createComment,
};
