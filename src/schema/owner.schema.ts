import { array, literal, number, object, string, TypeOf } from 'zod';

export const createOwnerSchema = object({
  body: object({
    phoneNumber: string({
      required_error: 'phoneNumber is required',
      invalid_type_error: 'phoneNumber must bet a string'
    })
      .trim()
      .length(10, { message: 'phoneNumber must be 10 characters' }),
    userName: string({
      required_error: 'userName is required',
      invalid_type_error: 'userName must bet a string'
    })
      .trim()
      .min(5, { message: 'userName must be at least 5 characters' })
      .max(20, { message: 'userName must be at most 20 characters' }),
    password: string({
      required_error: 'password is required',
      invalid_type_error: 'password must bet a string'
    })
      .trim()
      .min(8, { message: 'password must be at least 8 characters' })
      .max(32, { message: 'password must be at most 32 characters' }),
    description: string({
      invalid_type_error: 'description must be a string'
    }).optional(),
    location: object({
      name: string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required'
      }),
      longitude: number({
        invalid_type_error: 'longitude must be a number',
        required_error: 'longitude is required'
      }),
      latitude: number({
        invalid_type_error: 'latitude must be a number',
        required_error: 'latitude is required'
      }),
      cityName: string({
        invalid_type_error: 'cityName must be a string',
        required_error: 'cityName is required'
      }),
      streetName: string({
        invalid_type_error: 'streetName must be a string',
        required_error: 'streetName is required'
      }),
      zipCode: string({
        invalid_type_error: 'zipCode must be a string',
        required_error: 'zipCode is required'
      }).optional(),
      buildingNumber: string({
        invalid_type_error: 'buildingNumber must be a string',
        required_error: 'buildingNumber is required'
      }).optional(),
      description: string({
        invalid_type_error: 'description must be a string',
        required_error: 'description is required'
      }).optional()
    }).strict()
  }).strict()
});

export const createOnwerSessionSchema = object({
  body: object({
    phoneNumber: string(),
    password: string()
  }).strict()
});

export const createServiceSchema = object({
  body: object({
    name: string({
      invalid_type_error: 'name must be a string',
      required_error: 'name is required'
    }),
    serviceType: literal(1, { invalid_type_error: 'serviceType must be a number' }).or(
      literal(0, { invalid_type_error: 'serviceType must be a number' })
    ),
    services: array(
      object({
        name: string({ invalid_type_error: 'name must be a string', required_error: 'name is required' }),
        price: number({ invalid_type_error: 'price must be a number', required_error: 'price is required' })
      }).strict()
    ).min(1)
  }).strict()
});
export const deleteServiceSchema = object({
  params: object({
    id: string()
  })
});
export const updateServiceSchema = object({
  params: object({
    id: string()
  }),
  body: object({
    name: string({ invalid_type_error: 'name must be a string', required_error: 'name is required' }).optional(),
    serviceType: literal(1).or(literal(0)).optional()
  })
});
export const updateAddtionalServiceSchema = object({
  params: object({
    id: string(),
    a_id: string()
  }),
  body: object({
    name: string({}).optional(),
    price: number().optional()
  })
});
export const updateOrderStatusSchema = object({
  params: object({
    id: string()
  }),
  body: object({
    orderStatus: literal('wating').or(literal('ok'))
  })
});
export type createOwnerInput = TypeOf<typeof createOwnerSchema>;
export type createOwnerSessionInput = TypeOf<typeof createOnwerSessionSchema>;
export type createServiceInput = TypeOf<typeof createServiceSchema>;
export type deleteServiceInput = TypeOf<typeof deleteServiceSchema>;
export type updateServiceInput = TypeOf<typeof updateServiceSchema>;
export type updateAddtionalServiceInput = TypeOf<typeof updateAddtionalServiceSchema>;
export type updateOrderStatusInput = TypeOf<typeof updateOrderStatusSchema>;
