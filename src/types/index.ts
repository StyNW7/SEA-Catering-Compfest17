export interface Testimonial {
  id?: string
  name: string
  location: string
  rating: number
  message: string
  date?: string | Date
  avatar?: string
  verified: boolean
  plan: string
  createdAt: string | Date
  updatedAt?: string | Date
}