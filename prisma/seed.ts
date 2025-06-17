import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  console.log('Seeding database...');

  // Clear existing data
  await prisma.testimonial.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.user.deleteMany();

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
      name: 'Stanley Wijaya',
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
        popular: false,
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

  // Get all meal plans for subscription creation
  const allMealPlans = await prisma.mealPlan.findMany();

  // Create Subscriptions for regular user
  const subscriptions = await prisma.subscription.createMany({
    data: [
      {
        name: "John Doe",
        phone: "08123456789",
        mealTypes: ["breakfast", "lunch"],
        deliveryDays: ["monday", "wednesday", "friday"],
        allergies: "Peanuts, Shellfish",
        userId: regularUser.id,
        planId: allMealPlans[0].id,
        status: 'active',
        startDate: new Date(),
        endDate: null,
        totalPrice: 30000,
      },
      {
        name: "John Doe",
        phone: "08123456789",
        mealTypes: ["breakfast", "lunch"],
        deliveryDays: ["monday", "wednesday", "friday"],
        allergies: "Peanuts, Shellfish",
        userId: regularUser.id,
        planId: allMealPlans[1].id,
        status: 'paused',
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        totalPrice: 30000,
      },
      {
        name: "John Doe",
        phone: "08123456789",
        mealTypes: ["breakfast", "lunch"],
        deliveryDays: ["monday", "wednesday", "friday"],
        allergies: "Peanuts, Shellfish",
        userId: regularUser.id,
        planId: allMealPlans[2].id,
        status: 'cancelled',
        startDate: new Date(),
        endDate: null,
        totalPrice: 30000,
      }
    ],
    skipDuplicates: true,
  });

  console.log(`Created ${subscriptions.count} subscriptions for user ${regularUser.name}`);

  // Create Testimonials
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: "Sarah Johnson",
        location: "New York",
        rating: 5,
        message: "The Diet Plan has completely changed my eating habits. I have more energy and feel great!",
        plan: "Diet Plan",
        verified: true,
        avatar: "/images/testimonial/avatar-2.png"
      },
      {
        name: "Michael Chen",
        location: "San Francisco",
        rating: 4,
        message: "Lost 12 pounds in the first month with the Weight Loss Program. The meals are delicious and filling!",
        plan: "Protein Plan",
        verified: true,
        customerId: regularUser.id
      },
      {
        name: "David Wilson",
        location: "Chicago",
        rating: 5,
        message: "As a fitness enthusiast, the Protein Plan provides exactly what I need for my training regimen.",
        plan: "Protein Plan",
        verified: false
      },
      {
        name: "Emily Rodriguez",
        location: "Miami",
        rating: 5,
        message: "The Premium Gourmet Plan is worth every penny. It's like having a personal chef without the hassle!",
        plan: "Royal Plan",
        verified: true,
        avatar: "/images/testimonial/avatar-2.png"
      },
      {
        name: "Robert Kim",
        location: "Seattle",
        rating: 4,
        message: "Great variety and quality. The convenience of having healthy meals delivered is a game-changer.",
        plan: "Diet Plan",
        verified: true
      }
    ],
    skipDuplicates: true,
  });
  
  console.log(`Created ${testimonials.count} testimonials`);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });