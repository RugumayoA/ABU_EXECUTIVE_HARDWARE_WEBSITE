export type Product = {
  id: string
  name: string
  /** Amount in Ugandan Shillings (UGX). */
  price: number
  category: string
  description: string
  imageUrl: string
}

export type ProductInput = Omit<Product, 'id'>
