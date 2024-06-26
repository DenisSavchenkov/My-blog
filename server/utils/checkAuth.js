import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.userId = decoded.id;

      next();
    } catch (error) {
      res.json({ message: 'Нет доступа' });
    }
  } else {
    res.json({ message: 'Нет доступа' });
  }
};
