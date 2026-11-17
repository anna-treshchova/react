export const validateRequest = (validateFn, source = 'body') => {
   return (req, res, next) => {
      try{
         const validatedData = validateFn(req[source]);

         if (!req.validated) {
            req.validated = {};
         }
         req.validated[source] = validatedData;

         next();
      } catch (err) {
         next(err);
      }
   }
}



