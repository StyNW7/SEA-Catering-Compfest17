import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Meal Plans
  const dietPlan = await prisma.mealPlan.upsert({
    where: { name: 'Diet Plan' },
    update: {},
    create: {
      name: 'Diet Plan',
      pricePerMeal: 30000,
      description: 'Low-calorie meals designed for weight loss and healthy eating.',
      imageUrl: '/images/diet-plan.jpg', // Placeholder image path
    },
  });

  const proteinPlan = await prisma.mealPlan.upsert({
    where: { name: 'Protein Plan' },
    update: {},
    create: {
      name: 'Protein Plan',
      pricePerMeal: 40000,
      description: 'High-protein meals for muscle building and sustained energy.',
      imageUrl: '/images/protein-plan.jpg', // Placeholder image path
    },
  });

  const royalPlan = await prisma.mealPlan.upsert({
    where: { name: 'Royal Plan' },
    update: {},
    create: {
      name: 'Royal Plan',
      pricePerMeal: 60000,
      description: 'Premium gourmet meals with diverse ingredients and exquisite taste.',
      imageUrl: '/images/royal-plan.jpg', // Placeholder image path
    },
  });

  console.log('Meal plans created:', { dietPlan, proteinPlan, royalPlan });

  // Create an Admin User
  const hashedPassword = await bcrypt.hash('Admin@123', 10); // Hash a strong password
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

  

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });