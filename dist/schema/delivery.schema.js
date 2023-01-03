"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeDeliveryOnlineSchema = exports.createDeliverySessionSchema = exports.createDeliverySchema = void 0;
const zod_1 = require("zod");
exports.createDeliverySchema = (0, zod_1.object)({
    // TODO please add file upload to me
    body: (0, zod_1.object)({
        phoneNumber: (0, zod_1.string)({
            invalid_type_error: 'phoneNumber must be a string',
            required_error: 'phoneNumber is required'
        })
            .trim()
            .length(10, { message: 'phoneNumber must be 10 characters' }),
        userName: (0, zod_1.string)({
            invalid_type_error: 'userName must be a string',
            required_error: 'userName is required'
        })
            .trim()
            .min(5, { message: 'name must be at least 5 characters' })
            .max(20, { message: 'name must be at most 20 characters' }),
        password: (0, zod_1.string)({
            invalid_type_error: 'password must be a string',
            required_error: 'password is required'
        })
            .trim()
            .min(8, { message: 'password must be at least 8 characters' })
            .max(32, { message: 'password must be at most 32 characters' }),
        relativePhNumber: (0, zod_1.string)({
            invalid_type_error: 'relativePhNumber must be a string',
            required_error: 'relativePhNumber is required'
        })
            .trim()
            .length(10, { message: 'relativePhNumber must be 10 characters' }),
        relativeType: (0, zod_1.string)({
            invalid_type_error: 'relativeType must be a string',
            required_error: 'relativeType is required'
        }),
        residentLocation: (0, zod_1.string)({
            invalid_type_error: 'residentLocation must be a string',
            required_error: 'residentLocation is required'
        }),
        nationality: (0, zod_1.string)({
            invalid_type_error: 'nationality must be a string',
            required_error: 'nationality is required'
        }),
        vehicleType: (0, zod_1.string)({
            invalid_type_error: 'vehicleType must be a string',
            required_error: 'vehicleType is required'
        }),
        vehicleColor: (0, zod_1.string)({
            invalid_type_error: 'vehicleColor must be a string',
            required_error: 'vehicleColor is required'
        }),
        vehicleNumber: (0, zod_1.string)({
            invalid_type_error: 'vehicleNumber must be a string',
            required_error: 'vehicleNumber is required'
        })
    }).strict()
});
exports.createDeliverySessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phoneNumber: (0, zod_1.string)({
            invalid_type_error: 'phoneNumber must be a string',
            required_error: 'phoneNumber is required'
        }),
        password: (0, zod_1.string)({
            invalid_type_error: 'password must be a string',
            required_error: 'password is required'
        })
    }).strict()
});
exports.changeDeliveryOnlineSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        online: (0, zod_1.literal)(0).or((0, zod_1.literal)(1))
    }).strict()
});
//# sourceMappingURL=delivery.schema.js.map