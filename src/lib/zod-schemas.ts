import { z } from "zod";

// --- Authentication Schemas ---
export const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// --- Subscription Form Schemas ---
export const subscriptionSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  planId: z.string().min(1, "Meal plan selection is required"),
  mealTypes: z.array(z.string()).min(1, "At least one meal type must be selected"),
  deliveryDays: z.array(z.string()).min(1, "At least one delivery day must be selected"),
  allergies: z.string().optional(),
});

// --- Testimonial Form Schema ---
export const testimonialSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  reviewMessage: z.string().min(10, "Review message must be at least 10 characters"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
});

// --- Admin Dashboard Filtering Schema ---
export const dashboardFilterSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});