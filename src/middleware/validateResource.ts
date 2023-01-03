import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { generateErrorMessage, ErrorMessageOptions } from 'zod-error';
const options: ErrorMessageOptions = {
  delimiter: {
    error: ' 🔥 '
  },
  transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`
};
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    if (!result.success) {
      const errorMessage = generateErrorMessage(result.error.issues, options);
      return res.status(400).json({
        success: false,
        error_code: 400,
        message: errorMessage
      });
    }
    return next();
  } catch (err: any) {
    // TODO: Fix Me please
    return res.status(400).json({
      success: false,
      error_code: 400,
      message: err.message
    });
  }
};
export default validate;
