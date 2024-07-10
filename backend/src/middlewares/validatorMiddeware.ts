import { Request, Response, NextFunction } from 'express';

function validationMiddleware(schema: any, isParam?: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    let validationResult;
    isParam ? validationResult = schema.validate(req.params) : 
    validationResult = schema.validate(req.body)
    

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    next();
  };
}

export default validationMiddleware;
