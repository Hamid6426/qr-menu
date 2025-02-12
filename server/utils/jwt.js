import jwt from 'jsonwebtoken';

export const generateToken = (owner) => {
  return jwt.sign(
    { id: owner._id, ownerId: owner.ownerId, email: owner.email, fullName: owner.fullName },
    process.env.JWT_SECRET,
    { expiresIn: '12h' } // Token expires in 12 hours
  );
};
