import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  console.log('Seeding database...');

  // Create an Admin User
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@seacatering.com' },
    update: {},
    create: {
      name: 'SEA Catering Admin',
      email: 'admin@seacatering.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', adminUser);

  // Create a regular user
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'user@example.com',
      password: await bcrypt.hash('User@123', 10),
      role: 'USER',
    },
  });
  console.log('Regular user created:', regularUser);

  // Create Meal Plans
  const mealPlans = await prisma.mealPlan.createMany({
    data: [
      {
        name: "Diet Plan",
        price: "30000",
        originalPrice: "35000",
        description: "A balanced meal plan designed for weight management and healthy eating habits with portion-controlled meals.",
        image: "/images/meal/diet-plan.png",
        category: "weight-loss",
        popular: true,
        features: ["Calorie-controlled portions", "Low-carb options", "Fresh ingredients"],
        duration: "Flexible (weekly subscription)",
        mealsPerDay: 3,
        calories: "1500-1800",
        proteinPercent: "30",
        carbsPercent: "35",
        fatsPercent: "35",
        includes: ["3 meals per day", "Nutritional information", "Weekly menu rotation"],
        benefits: ["Supports weight loss", "Teaches portion control", "Reduces cravings"],
        sampleMeals: ["Grilled chicken salad", "Vegetable stir-fry with tofu", "Quinoa bowl with roasted vegetables"]
      },
      {
        name: "Protein Plan",
        price: "40000",
        originalPrice: "45000",
        description: "High-protein meals to support muscle growth, recovery, and active lifestyles.",
        image: "/images/meal/protein-plan.png",
        category: "muscle-building",
        popular: true,
        features: ["High-protein meals", "Athlete-approved", "Muscle recovery focus"],
        duration: "Flexible (weekly subscription)",
        mealsPerDay: 4,
        calories: "2000-2500",
        proteinPercent: "40",
        carbsPercent: "35",
        fatsPercent: "25",
        includes: ["4 meals per day", "Post-workout options", "Supplement recommendations"],
        benefits: ["Supports muscle growth", "Enhances recovery", "Maintains energy levels"],
        sampleMeals: ["Grilled steak with sweet potato", "Salmon with quinoa", "Chicken breast with brown rice"]
      },
      {
        name: "Royal Plan",
        price: "60000",
        originalPrice: "70000",
        description: "Premium gourmet experience with chef-crafted meals using the finest ingredients for discerning clients.",
        image: "/images/meal/royal-plan.png",
        category: "premium",
        popular: false,
        features: ["Gourmet quality", "Premium ingredients", "Customizable options"],
        duration: "Flexible (weekly subscription)",
        mealsPerDay: 3,
        calories: "1800-2200",
        proteinPercent: "30",
        carbsPercent: "40",
        fatsPercent: "30",
        includes: ["3 gourmet meals", "Dessert options", "Personal chef consultation"],
        benefits: ["Restaurant-quality at home", "Impressive presentation", "Special occasion worthy"],
        sampleMeals: ["Beef Wellington with truffle sauce", "Lobster thermidor", "Duck confit with cherry reduction"]
      }
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${mealPlans.count} meal plans`);

  // Create Testimonials
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: "Sarah Johnson",
        location: "New York",
        rating: 5,
        message: "The Balanced Lifestyle Plan has completely changed my eating habits. I have more energy and feel great!",
        plan: "Balanced Lifestyle Plan",
        verified: true,
        avatar: "/images/testimonials/sarah.jpg"
      },
      {
        name: "Michael Chen",
        location: "San Francisco",
        rating: 4,
        message: "Lost 12 pounds in the first month with the Weight Loss Program. The meals are delicious and filling!",
        plan: "Weight Loss Program",
        verified: true,
        customerId: regularUser.id
      },
      {
        name: "David Wilson",
        location: "Chicago",
        rating: 5,
        message: "As a fitness enthusiast, the Muscle Building Plan provides exactly what I need for my training regimen.",
        plan: "Muscle Building Plan",
        verified: false
      },
      {
        name: "Emily Rodriguez",
        location: "Miami",
        rating: 5,
        message: "The Premium Gourmet Plan is worth every penny. It's like having a personal chef without the hassle!",
        plan: "Premium Gourmet Plan",
        verified: true,
        avatar: "/images/testimonials/emily.jpg"
      },
      {
        name: "Robert Kim",
        location: "Seattle",
        rating: 4,
        message: "Great variety and quality. The convenience of having healthy meals delivered is a game-changer.",
        plan: "Balanced Lifestyle Plan",
        verified: true
      }
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${testimonials.count} testimonials`);

  // Create a sample subscription for the regular user
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { name: "Balanced Lifestyle Plan" }
  });

  if (mealPlan) {
    const subscription = await prisma.subscription.create({
      data: {
        userId: regularUser.id,
        planId: mealPlan.id,
        mealTypes: ["Breakfast", "Lunch", "Dinner"],
        deliveryDays: ["Monday", "Wednesday", "Friday"],
        allergies: "None",
        totalPrice: 299.00,
        status: "Active"
      }
    });
    console.log('Created subscription:', subscription);
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });