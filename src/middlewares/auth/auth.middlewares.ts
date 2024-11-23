import { Role } from '../../models/user.model.';

export const isClient = (req, res, next) => {
  if (req.user.role === Role.CLIENT) {
    return next();
  }
  return res.status(403).json({ message: 'You are not a client' });
};
