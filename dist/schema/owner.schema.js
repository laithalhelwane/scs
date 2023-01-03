"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusSchema = exports.updateAddtionalServiceSchema = exports.updateServiceSchema = exports.deleteServiceSchema = exports.createServiceSchema = exports.createOnwerSessionSchema = exports.createOwnerSchema = void 0;
const zod_1 = require("zod");
exports.createOwnerSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phoneNumber: (0, zod_1.string)({
            required_error: 'phoneNumber is required',
            invalid_type_error: 'phoneNumber must bet a string'
        })
            .trim()
            .length(10, { message: 'phoneNumber must be 10 characters' }),
        userName: (0, zod_1.string)({
            required_error: 'userName is required',
            invalid_type_error: 'userName must bet a string'
        })
            .trim()
            .min(5, { message: 'userName must be at least 5 characters' })
            .max(20, { message: 'userName must be at most 20 characters' }),
        password: (0, zod_1.string)({
            required_error: 'password is required',
            invalid_type_error: 'password must bet a string'
        })
            .trim()
            .min(8, { message: 'password must be at least 8 characters' })
            .max(32, { message: 'password must be at most 32 characters' }),
        description: (0, zod_1.string)({
            invalid_type_error: 'description must be a string'
        }).optional(),
        location: (0, zod_1.object)({
            name: (0, zod_1.string)({
                invalid_type_error: 'name must be a string',
                required_error: 'name is required'
            }),
            longitude: (0, zod_1.number)({
                invalid_type_error: 'longitude must be a number',
                required_error: 'longitude is required'
            }),
            latitude: (0, zod_1.number)({
                invalid_type_error: 'latitude must be a number',
                required_error: 'latitude is required'
            }),
            cityName: (0, zod_1.string)({
                invalid_type_error: 'cityName must be a string',
                required_error: 'cityName is required'
            }),
            streetName: (0, zod_1.string)({
                invalid_type_error: 'streetName must be a string',
                required_error: 'streetName is required'
            }),
            zipCode: (0, zod_1.string)({
                invalid_type_error: 'zipCode must be a string',
                required_error: 'zipCode is required'
            }).optional(),
            buildingNumber: (0, zod_1.string)({
                invalid_type_error: 'buildingNumber must be a string',
                required_error: 'buildingNumber is required'
            }).optional(),
            description: (0, zod_1.string)({
                invalid_type_error: 'description must be a string',
                required_error: 'description is required'
            }).optional()
        }).strict()
    }).strict()
});
exports.createOnwerSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phoneNumber: (0, zod_1.string)(),
        password: (0, zod_1.string)()
    }).strict()
});
exports.createServiceSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            invalid_type_error: 'name must be a string',
            required_error: 'name is required'
        }),
        serviceType: (0, zod_1.literal)(1, { invalid_type_error: 'serviceType must be a number' }).or((0, zod_1.literal)(0, { invalid_type_error: 'serviceType must be a number' })),
        services: (0, zod_1.array)((0, zod_1.object)({
            name: (0, zod_1.string)({ invalid_type_error: 'name must be a string', required_error: 'name is required' }),
            price: (0, zod_1.number)({ invalid_type_error: 'price must be a number', required_error: 'price is required' })
        }).strict()).min(1)
    }).strict()
});
exports.deleteServiceSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)()
    })
});
exports.updateServiceSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)()
    }),
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ invalid_type_error: 'name must be a string', required_error: 'name is required' }).optional(),
        serviceType: (0, zod_1.literal)(1).or((0, zod_1.literal)(0)).optional()
    })
});
exports.updateAddtionalServiceSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
        a_id: (0, zod_1.string)()
    }),
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({}).optional(),
        price: (0, zod_1.number)().optional()
    })
});
exports.updateOrderStatusSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)()
    }),
    body: (0, zod_1.object)({
        orderStatus: (0, zod_1.literal)('wating').or((0, zod_1.literal)('ok'))
    })
});
//# sourceMappingURL=owner.schema.js.map