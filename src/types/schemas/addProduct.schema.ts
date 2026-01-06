import * as z from "zod";

export type AddProductT = z.infer<typeof AddProductSchema>;

export const AddProductSchema = z.object({
  name: z.string().min(3, {message: "Название должно быть длиннее 3 символов"}).max(15),
  price: z.int().min(1).max(1000000),
  lost: z.int().min(1).max(10000000),
})