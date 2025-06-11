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

  // Create Sample Testimonials
  // const testimonials = [
  //   {
  //     customerName: 'Alice Wonderland',
  //     reviewMessage: 'SEA Catering has transformed my eating habits! The Diet Plan is delicious and effective.',
  //     rating: 5,
  //   },
  //   {
  //     customerName: 'Bob The Builder',
  //     reviewMessage: 'As a busy professional, the Protein Plan is a lifesaver. High quality and convenient!',
  //     rating: 4,
  //   },
  //   {
  //     customerName: 'Charlie Chaplin',
  //     reviewMessage: 'The Royal Plan is a culinary delight. Every meal feels like a gourmet experience.',
  //     rating: 5,
  //   },
  // ];

  // for (const t of testimonials) {
  //   await prisma.testimonial.upsert({
  //     where: { customerName: t.customerName },
  //     update: {},
  //     create: t,
  //   });
  // }
  // console.log('Sample testimonials created.');

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
