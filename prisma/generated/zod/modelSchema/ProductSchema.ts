import { z } from 'zod';

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(4000),
  price: z.number().min(1),
  stock: z.number().min(0),
  imageUrl: z.string().nullable(),
  userId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// PRODUCT PARTIAL SCHEMA
/////////////////////////////////////////

export const ProductPartialSchema = ProductSchema.partial()

export type ProductPartial = z.infer<typeof ProductPartialSchema>

/////////////////////////////////////////
// PRODUCT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ProductOptionalDefaultsSchema = ProductSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ProductOptionalDefaults = z.infer<typeof ProductOptionalDefaultsSchema>

export default ProductSchema;
