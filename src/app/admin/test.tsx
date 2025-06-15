import { useState, useEffect } from 'react'
import { DateRange } from 'react-day-picker'
import { startOfMonth, endOfMonth, subDays, format } from 'date-fns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

// Types
interface MetricCardProps {
  title: string
  value: string
  change: number
  isCurrency?: boolean
}

interface ChartData {
  month?: string
  date?: string
  name?: string
  revenue?: number
  subscriptions?: number
  active?: number
  new?: number
  cancelled?: number
  value?: number
  color?: string
}

// Helper components
const MetricCard = ({ title, value, change }: MetricCardProps) => {
  const isPositive = change >= 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change.toFixed(1)}% from last period
        </div>
      </CardContent>
    </Card>
  )
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-[120px]" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[400px]" />
      ))}
    </div>
  </div>
)

// Main component
export default function AdminDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [metrics, setMetrics] = useState({
    newSubscriptions: 0,
    newSubscriptionsChange: 0,
    mrr: 0,
    mrrChange: 0,
    reactivations: 0,
    reactivationsChange: 0,
    activeSubscriptions: 0,
    activeSubscriptionsChange: 0,
  })
  const [revenueData, setRevenueData] = useState<ChartData[]>([])
  const [growthData, setGrowthData] = useState<ChartData[]>([])
  const [planData, setPlanData] = useState<ChartData[]>([])

  // Formatting functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num)
  }

  // Handle period change
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    const now = new Date()

    switch (period) {
      case "7d":
        setDateRange({ from: subDays(now, 7), to: now })
        break
      case "30d":
        setDateRange({ from: subDays(now, 30), to: now })
        break
      case "90d":
        setDateRange({ from: subDays(now, 90), to: now })
        break
      case "1y":
        setDateRange({ from: subDays(now, 365), to: now })
        break
      default:
        setDateRange({ from: startOfMonth(now), to: endOfMonth(now) })
    }
  }

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false)
        
        // Format dates for API
        const from = dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''
        const to = dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''

        // Fetch all data in parallel
        const [metricsRes, revenueRes, growthRes, planRes] = await Promise.all([
          fetch(`/api/admin/metrics?from=${from}&to=${to}`),
          fetch('/api/admin/charts/revenue?months=6'),
          fetch('/api/admin/charts/growth?days=30'),
          fetch('/api/admin/charts/plans')
        ])

        if (!metricsRes.ok || !revenueRes.ok || !growthRes.ok || !planRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const [metricsData, revenueData, growthData, planData] = await Promise.all([
          metricsRes.json(),
          revenueRes.json(),
          growthRes.json(),
          planRes.json()
        ])

        setMetrics(metricsData)
        setRevenueData(revenueData)
        setGrowthData(growthData)
        setPlanData(planData)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setIsLoaded(true) // Still show UI even if there's an error
      }
    }

    fetchData()
  }, [dateRange])

  // Period buttons
  const periodButtons = [
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
    { label: "1Y", value: "1y" },
    { label: "MTD", value: "mtd" },
  ]

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          {periodButtons.map((button) => (
            <Button
              key={button.value}
              variant={selectedPeriod === button.value ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange(button.value)}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      {!isLoaded ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="New Subscriptions"
              value={formatNumber(metrics.newSubscriptions)}
              change={metrics.newSubscriptionsChange}
            />
            <MetricCard
              title="Monthly Revenue"
              value={formatPrice(metrics.mrr)}
              change={metrics.mrrChange}
              isCurrency
            />
            <MetricCard
              title="Reactivations"
              value={formatNumber(metrics.reactivations)}
              change={metrics.reactivationsChange}
            />
            <MetricCard
              title="Active Subscriptions"
              value={formatNumber(metrics.activeSubscriptions)}
              change={metrics.activeSubscriptionsChange}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === 'revenue') {
                            return [formatPrice(Number(value)), 'Revenue']
                          }
                          return [value, 'Subscriptions']
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="subscriptions" name="Subscriptions" stroke="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="active" stroke="#8884d8" name="Active" />
                      <Line type="monotone" dataKey="new" stroke="#82ca9d" name="New" />
                      <Line type="monotone" dataKey="cancelled" stroke="#ff7300" name="Cancelled" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Plan Distribution Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {planData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [value, name]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}