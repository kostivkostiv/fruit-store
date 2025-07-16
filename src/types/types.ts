export type Product = {
  id: number,
  imageUrl: string,
  name: string,
  count: number,
  size: {
    width: number,
    height: number
  },
  weight: string,
  comments: number[]
}

export type Comment = {
  id: number,
  productId: number,
  description: string,
  date: string
}
