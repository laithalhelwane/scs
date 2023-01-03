import { number, object, string, TypeOf, array } from 'zod';

export const createClientSchema = object({
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
      .max(32, { message: 'password must be at most 32 characters' })
  }).strict()
});
export const updateClientSchema = object({
  body: object({
    phoneNumber: string({ invalid_type_error: 'phoneNumber must bet a string' })
      .trim()
      .length(10, { message: 'phoneNumber must be 10 characters' })
      .optional(),
    userName: string({
      invalid_type_error: 'userName must bet a string'
    })
      .trim()
      .min(5, { message: 'userName must be at least 5 characters' })
      .max(20, { message: 'userName must be at most 20 characters' })
      .optional(),
    password: string({
      invalid_type_error: 'password must bet a string'
    })
      .trim()
      .min(8, { message: 'password must be at least 8 characters' })
      .max(32, { message: 'password must be at most 32 characters' })
      .optional()
  }).strict()
});

export const createClientSessionSchema = object({
  body: object({
    phoneNumber: string({
      required_error: 'phoneNumber is required',
      invalid_type_error: 'phoneNumber must bet a string'
    })
      .trim()
      .length(10, { message: 'phoneNumber must be 10 characters' }),
    password: string({
      required_error: 'password is required',
      invalid_type_error: 'password must bet a string'
    }).trim()
  })
});

export const createClientLocationSchema = object({
  body: object({
    name: string(),
    longitude: number(),
    latitude: number(),
    cityName: string(),
    streetName: string(),
    zipCode: string(),
    buildingNumber: string(),
    description: string().optional()
  }).strict()
});
export const getClientLocationSchema = object({
  parmas: object({
    id: number()
  })
});
export const getOwnersSchema = object({
  body: object({
    locationId: number()
  }).strict()
});
export const getServicesSchema = object({
  params: object({
    id: number()
  }).strict()
});
export const createOrderSchema = object({
  params: object({ id: number() }),
  body: array(
    object({
      serviceId: number(),
      quantity: number(),
      order_service_detail: array(
        object({
          service_varietyId: number()
        })
      )
    })
  )
});
export const getOrderSchema = object({
  params: object({
    id: number()
  })
});

export const createOrderRateSchema = object({
  params: object({
    id: number()
  }),
  body: object({
    value: number()
  })
});

export const createOrderFavoriteSchema = object({
  params: object({
    id: number()
  })
});

export type createClientSessionInput = TypeOf<typeof createClientSessionSchema>;

export type createClientInput = TypeOf<typeof createClientSchema>;

export type updateClientInput = TypeOf<typeof updateClientSchema>;

export type createClientLocationInput = TypeOf<typeof createClientLocationSchema>;

export type getClientLocationInput = TypeOf<typeof getClientLocationSchema>;

export type getOwnersInput = TypeOf<typeof getOwnersSchema>;

export type getServicesInput = TypeOf<typeof getServicesSchema>;

export type createOrderInput = TypeOf<typeof createOrderSchema>;

export type getOrderInput = TypeOf<typeof getOrderSchema>;

export type createOrderRateInput = TypeOf<typeof createOrderRateSchema>;

export type createOrderFavoriteInput = TypeOf<typeof createOrderFavoriteSchema>;
