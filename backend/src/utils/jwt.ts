import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'supersecretjwtkey', {
    expiresIn: '7d',
  });
};
