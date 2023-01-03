import { literal, object, string, TypeOf } from 'zod';

export const createDeliverySchema = object({
  // TODO please add file upload to me
  body: object({
    phoneNumber: string({
      invalid_type_error: 'phoneNumber must be a string',
      required_error: 'phoneNumber is required'
    })
      .trim()
      .length(10, { message: 'phoneNumber must be 10 characters' }),
    userName: string({
      invalid_type_error: 'userName must be a string',
      required_error: 'userName is required'
    })
      .trim()
      .min(5, { message: 'name must be at least 5 characters' })
      .max(20, { message: 'name must be at most 20 characters' }),
    password: string({
      invalid_type_error: 'password must be a string',
      required_error: 'password is required'
    })
      .trim()
      .min(8, { message: 'password must be at least 8 characters' })
      .max(32, { message: 'password must be at most 32 characters' }),
    relativePhNumber: string({
      invalid_type_error: 'relativePhNumber must be a string',
      required_error: 'relativePhNumber is required'
    })
      .trim()
      .length(10, { message: 'relativePhNumber must be 10 characters' }),
    relativeType: string({
      invalid_type_error: 'relativeType must be a string',
      required_error: 'relativeType is required'
    }),
    residentLocation: string({
      invalid_type_error: 'residentLocation must be a string',
      required_error: 'residentLocation is required'
    }),
    nationality: string({
      invalid_type_error: 'nationality must be a string',
      required_error: 'nationality is required'
    }),
    vehicleType: string({
      invalid_type_error: 'vehicleType must be a string',
      required_error: 'vehicleType is required'
    }),
    vehicleColor: string({
      invalid_type_error: 'vehicleColor must be a string',
      required_error: 'vehicleColor is required'
    }),
    vehicleNumber: string({
      invalid_type_error: 'vehicleNumber must be a string',
      required_error: 'vehicleNumber is required'
    })
  }).strict()
});

export const createDeliverySessionSchema = object({
  body: object({
    phoneNumber: string({
      invalid_type_error: 'phoneNumber must be a string',
      required_error: 'phoneNumber is required'
    }),
    password: string({
      invalid_type_error: 'password must be a string',
      required_error: 'password is required'
    })
  }).strict()
});

export const changeDeliveryOnlineSchema = object({
  body: object({
    online: literal(0).or(literal(1))
  }).strict()
});

export type createDeliveryInput = TypeOf<typeof createDeliverySchema>;

export type createDeliverySessionInput = TypeOf<typeof createDeliverySessionSchema>;

export type changeDeliveryOnlineInput = TypeOf<typeof changeDeliveryOnlineSchema>;
