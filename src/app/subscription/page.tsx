"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { subscriptionSchema } from "@/lib/zod-schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";

import { toast } from "sonner"
import Link from "next/link";

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

interface MealPlan {
  id: string;
  name: string;
  pricePerMeal: number;
}

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];
const DELIVERY_DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];
const PRICE_FACTOR = 4.3;

export default function SubscribePage() {
    
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loadingMealPlans, setLoadingMealPlans] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: session?.user?.name || "", // Pre-fill if logged in
      phoneNumber: "",
      planId: "",
      mealTypes: [],
      deliveryDays: [],
      allergies: "",
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  // Watch form values for dynamic price calculation
  const watchedPlanId = watch("planId");
  const watchedMealTypes = watch("mealTypes");
  const watchedDeliveryDays = watch("deliveryDays");

  useEffect(() => {

    // Redirect unauthenticated users
    if (status === "unauthenticated") {
      router.push("/auth/login");

      toast( "Authentication Required", {
        description: "Please log in to subscribe to a meal plan."
      });

    }
  }, [status, router, toast]);

  useEffect(() => {
    async function fetchMealPlans() {
      try {
        const response = await fetch('/api/meal-plans');
        if (!response.ok) {
          throw new Error('Failed to fetch meal plans');
        }
        const data = await response.json();
        setMealPlans(data.data);
      } catch (error: unknown) {
        console.error('Error fetching meal plans:', error);

        toast( "Error :(", {
            description: "Failed to load meals."
        });

      } finally {
        setLoadingMealPlans(false);
      }
    }
    fetchMealPlans();
  }, [toast]);

  // Effect for price calculation
  useEffect(() => {
    const selectedPlan = mealPlans.find(plan => plan.id === watchedPlanId);
    if (selectedPlan && watchedMealTypes.length > 0 && watchedDeliveryDays.length > 0) {
      const price =
        selectedPlan.pricePerMeal *
        watchedMealTypes.length *
        watchedDeliveryDays.length *
        PRICE_FACTOR;
      setCalculatedPrice(price);
    } else {
      setCalculatedPrice(0);
    }
  }, [watchedPlanId, watchedMealTypes, watchedDeliveryDays, mealPlans]);

  const onSubmit = async (values: SubscriptionFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, totalPrice: calculatedPrice }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit subscription');
      }

      toast( "Subscription Successful", {
        description: "Your meal plan has been set up. Check your dashboard for details."
      });

      form.reset(); // Reset form after successful submission
      router.push("/dashboard/user"); // Redirect to user dashboard

    } catch (error: unknown) {
      console.error("Subscription submission error:", error);

      toast( "Submission Error", {
        description: "Something went wrong. Please try again."
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || loadingMealPlans) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading form...</p>
      </div>
    );
  }

  // Only render the form if authenticated
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-muted-foreground">Please log in to view and manage your subscriptions.</p>
        <Button asChild className="mt-6">
          <Link href="/auth/login">Go to Login</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Subscribe to a Meal Plan</h1>
      <Card className="max-w-2xl mx-auto p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Subscription Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register("name")}
                className="mt-1"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="phoneNumber">Active Phone Number *</Label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber")}
                className="mt-1"
                placeholder="08123456789"
              />
              {errors.phoneNumber && <p className="text-destructive text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <Label htmlFor="planId">Plan Selection *</Label>
              <Select onValueChange={(value) => setValue("planId", value)} value={watchedPlanId}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a meal plan" />
                </SelectTrigger>
                <SelectContent>
                  {mealPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} (Rp{plan.pricePerMeal.toLocaleString('id-ID')} / meal)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.planId && <p className="text-destructive text-sm mt-1">{errors.planId.message}</p>}
            </div>

            <div>
              <Label>Meal Type * (Select one or more)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                {MEAL_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`meal-type-${type}`}
                      value={type}
                      onCheckedChange={(checked) => {
                        const currentMealTypes = form.getValues("mealTypes");
                        if (checked) {
                          setValue("mealTypes", [...currentMealTypes, type]);
                        } else {
                          setValue(
                            "mealTypes",
                            currentMealTypes.filter((mt) => mt !== type)
                          );
                        }
                      }}
                      checked={watchedMealTypes.includes(type)}
                    />
                    <Label htmlFor={`meal-type-${type}`}>{type}</Label>
                  </div>
                ))}
              </div>
              {errors.mealTypes && <p className="text-destructive text-sm mt-1">{errors.mealTypes.message}</p>}
            </div>

            <div>
              <Label>Delivery Days * (Select any combination)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {DELIVERY_DAYS.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={`delivery-day-${day}`}
                      value={day}
                      onCheckedChange={(checked) => {
                        const currentDeliveryDays = form.getValues("deliveryDays");
                        if (checked) {
                          setValue("deliveryDays", [...currentDeliveryDays, day]);
                        } else {
                          setValue(
                            "deliveryDays",
                            currentDeliveryDays.filter((dd) => dd !== day)
                          );
                        }
                      }}
                      checked={watchedDeliveryDays.includes(day)}
                    />
                    <Label htmlFor={`delivery-day-${day}`}>{day}</Label>
                  </div>
                ))}
              </div>
              {errors.deliveryDays && <p className="text-destructive text-sm mt-1">{errors.deliveryDays.message}</p>}
            </div>

            <div>
              <Label htmlFor="allergies">Allergies (Optional)</Label>
              <Textarea
                id="allergies"
                {...register("allergies")}
                className="mt-1"
                placeholder="e.g., Peanuts, Dairy, Gluten"
              />
              {errors.allergies && <p className="text-destructive text-sm mt-1">{errors.allergies.message}</p>}
            </div>

            <CardFooter className="flex flex-col gap-4 p-0 pt-6">
              <div className="w-full text-center text-2xl font-bold text-primary">
                Total Price: Rp{calculatedPrice.toLocaleString('id-ID')}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Confirm Subscription"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}