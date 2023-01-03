"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_error_1 = require("zod-error");
const options = {
    delimiter: {
        error: ' 🔥 '
    },
    transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`
};
const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        if (!result.success) {
            const errorMessage = (0, zod_error_1.generateErrorMessage)(result.error.issues, options);
            return res.status(400).json({
                success: false,
                error_code: 400,
                message: errorMessage
            });
        }
        return next();
    }
    catch (err) {
        // TODO: Fix Me please
        return res.status(400).json({
            success: false,
            error_code: 400,
            message: err.message
        });
    }
};
exports.default = validate;
//# sourceMappingURL=validateResource.js.map