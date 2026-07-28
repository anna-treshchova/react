export const validateRequest = (validateFn, source = 'body') => {
   return (req, res, next) => {
      try{
         const validatedData = validateFn(req[source]);

         for (const key in req[source]) {
            delete req[source][key];
         }

         Object.assign(req[source], validatedData);

         next();
      } catch (err) {
         next(err);
      }
   }
}



