import pool from './connection';

const query = async (text, param) => {
  try {
    return await pool.query(text, param);
  } catch (error) {
    return error;
  }
};

export default query;