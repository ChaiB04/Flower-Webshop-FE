export interface Product {
  id: number
  name: string
  description: string
  price: number
  date_created: Date
  flower_category: string
  product_category: string
  archived: boolean
  stock: number
  meaning: string
}

export interface User {
  id: string
  name: string
  role: "admin" | "customer"
}
