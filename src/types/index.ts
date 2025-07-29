import { Product, User } from "@prisma/client"


export type ProductWithUser = Product & 
  { user: Pick<User, "id" | "name" | "imageUrl"> }

