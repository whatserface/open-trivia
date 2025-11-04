import { BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid, Legend } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getCountGlobal } from '@/utils'

export default function QuestionsCategoriesBar() {
  const { data: countData, error: counterror } = useQuery({
    queryKey: ["count"],
    queryFn: getCountGlobal,
    staleTime: 30*60*1000, // 30 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
  const { data: categoryData, error: categoryerror } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  if (counterror || categoryerror) return <>Error fetching chart data</>


  const categoryNames: Record<number, string> = {}
  for (const category of (categoryData?.trivia_categories ?? [])) {
    categoryNames[category.id] = category.name
  }

  const transformedData = Object.entries(countData?.categories ?? {}).map(([id, categoryData]) => ({
    name: categoryNames[id as unknown as number],
    questions: categoryData.total_num_of_questions
  })).sort((a, b) => b.questions - a.questions)

  console.log(transformedData)

  return (
    <BarChart
      layout="vertical"
      width={500}
      height={800}
      data={transformedData}
      margin={{
        top: 30,
        right: 20,
        bottom: 10,
        left: 10,
      }}
      title="The distribution of questions by category"
    >
      <text x={500 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
        <tspan fontSize="14">The distribution of questions by category</tspan>
      </text>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis type="number" />
      <YAxis width={200} height={100} tickSize={10} interval={0} dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="questions" stackId="a" fill="#8884d8" />
    </BarChart>
  )
}
