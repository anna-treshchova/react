export const validateBody = (validateFn) => {
   return (req, res, next) => {
      const { value, errorCode } = validateFn(req.body);

      if (errorCode)  {
         return res.status(400).json({ errorCode });
      }

      req.body = value;
      next();
   }
}

