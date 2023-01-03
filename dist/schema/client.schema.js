"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderFavoriteSchema = exports.createOrderRateSchema = exports.getOrderSchema = exports.createOrderSchema = exports.getServicesSchema = exports.getOwnersSchema = exports.getClientLocationSchema = exports.createClientLocationSchema = exports.createClientSessionSchema = exports.updateClientSchema = exports.createClientSchema = void 0;
const zod_1 = require("zod");
exports.createClientSchema = (0, zod_1.object)({
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
            .max(32, { message: 'password must be at most 32 characters' })
    }).strict()
});
exports.updateClientSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phoneNumber: (0, zod_1.string)({ invalid_type_error: 'phoneNumber must bet a string' })
            .trim()
            .length(10, { message: 'phoneNumber must be 10 characters' })
            .optional(),
        userName: (0, zod_1.string)({
            invalid_type_error: 'userName must bet a string'
        })
            .trim()
            .min(5, { message: 'userName must be at least 5 characters' })
            .max(20, { message: 'userName must be at most 20 characters' })
            .optional(),
        password: (0, zod_1.string)({
            invalid_type_error: 'password must bet a string'
        })
            .trim()
            .min(8, { message: 'password must be at least 8 characters' })
            .max(32, { message: 'password must be at most 32 characters' })
            .optional()
    }).strict()
});
exports.createClientSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        phoneNumber: (0, zod_1.string)({
            required_error: 'phoneNumber is required',
            invalid_type_error: 'phoneNumber must bet a string'
        })
            .trim()
            .length(10, { message: 'phoneNumber must be 10 characters' }),
        password: (0, zod_1.string)({
            required_error: 'password is required',
            invalid_type_error: 'password must bet a string'
        }).trim()
    })
});
exports.createClientLocationSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        longitude: (0, zod_1.number)(),
        latitude: (0, zod_1.number)(),
        cityName: (0, zod_1.string)(),
        streetName: (0, zod_1.string)(),
        zipCode: (0, zod_1.string)(),
        buildingNumber: (0, zod_1.string)(),
        description: (0, zod_1.string)().optional()
    }).strict()
});
exports.getClientLocationSchema = (0, zod_1.object)({
    parmas: (0, zod_1.object)({
        id: (0, zod_1.number)()
    })
});
exports.getOwnersSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        locationId: (0, zod_1.number)()
    }).strict()
});
exports.getServicesSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.number)()
    }).strict()
});
exports.createOrderSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({ id: (0, zod_1.number)() }),
    body: (0, zod_1.array)((0, zod_1.object)({
        serviceId: (0, zod_1.number)(),
        quantity: (0, zod_1.number)(),
        order_service_detail: (0, zod_1.array)((0, zod_1.object)({
            service_varietyId: (0, zod_1.number)()
        }))
    }))
});
exports.getOrderSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.number)()
    })
});
exports.createOrderRateSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.number)()
    }),
    body: (0, zod_1.object)({
        value: (0, zod_1.number)()
    })
});
exports.createOrderFavoriteSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.number)()
    })
});
//# sourceMappingURL=client.schema.js.map