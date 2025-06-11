"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Loader2Icon, DollarSignIcon } from "lucide-react";
import { toast } from "sonner"

interface MealPlan {
  id: string;
  name: string;
  pricePerMeal: number;
  description: string;
  imageUrl?: string;
}

export default function MenuPage() {

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);

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

        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })


      } finally {
        setLoading(false);
      }
    }
    fetchMealPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading meal plans...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Meal Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mealPlans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              {plan.imageUrl && (
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={plan.imageUrl}
                    alt={plan.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      // Fallback to a placeholder image if the original fails
                      e.currentTarget.src = `https://placehold.co/600x400/E0E0E0/333333?text=${plan.name.replace(/\s/g, '+')}`;
                    }}
                  />
                </div>
              )}
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="flex items-center text-lg font-semibold text-primary mt-2">
                <DollarSignIcon className="h-5 w-5 mr-1" />
                Rp{plan.pricePerMeal.toLocaleString('id-ID')} / meal
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{plan.description}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">See More Details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{plan.name} Details</DialogTitle>
                    <DialogDescription>
                      Comprehensive information about the {plan.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {plan.imageUrl && (
                      <div className="relative w-full h-48 rounded-md overflow-hidden">
                        <Image
                          src={plan.imageUrl}
                          alt={plan.name}
                          layout="fill"
                          objectFit="cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/600x400/E0E0E0/333333?text=${plan.name.replace(/\s/g, '+')}`;
                          }}
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-lg font-semibold text-primary">Rp{plan.pricePerMeal.toLocaleString('id-ID')} / meal</p>
                    <p className="text-muted-foreground">{plan.description}</p>
                    {/* Add more specific details if your plans have them */}
                    <p className="text-sm text-gray-500">
                      Ideal for: [Audience/Goal - e.g., Weight Management, Muscle Gain]
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}