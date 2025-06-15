import { MealPlanForm } from '@/components/meal-plan/MealPlanForm'
import { MealPlanList } from '@/components/meal-plan/MealPlanList'

export default function MealPlansPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Meal Plans</h1>
      <MealPlanList />
      <MealPlanForm />
    </div>
  )
}