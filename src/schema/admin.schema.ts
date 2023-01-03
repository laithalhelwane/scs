import { boolean, number, object, TypeOf } from 'zod';
export const updateDeliveryStatusSchema = object({
  params: object({
    id: number()
  }),
  body: object({
    activated: boolean()
  })
});

export type updateDeliveryStatusInput = TypeOf<typeof updateDeliveryStatusSchema>;
