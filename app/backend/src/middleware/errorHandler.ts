import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = ({ code, message }, _req, res, _next) => {
  res.status(code || 500).json({ message });
};

export default errorMiddleware;
