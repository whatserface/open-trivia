import { useQueryClient } from "@tanstack/react-query"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import type { Question } from "@/types"

const COLORS = ["#4ade80", "#facc15", "#f87171"] // easy = green, medium = yellow, hard = red

export default function QuestionsDifficultyPie() {
  const queryClient = useQueryClient()

  // Get latest cached questions
  const questions: Question[] = (() => {
    const questionKeys = queryClient
      .getQueryCache()
      .getAll()
      .map(q => q.queryKey)
      .filter(key => key[0] === "questions-cache")
    if (!questionKeys.length) return []
    const lastKey = questionKeys[questionKeys.length - 1]
    return queryClient.getQueryData<Question[]>(lastKey) || []
  })()

  if (!questions.length)
    return <div className="text-center text-gray-500">No questions available.</div>

  // Prepare data for PieChart
  const data = [
    { name: "Easy", value: questions.filter(q => q.difficulty === "easy").length },
    { name: "Medium", value: questions.filter(q => q.difficulty === "medium").length },
    { name: "Hard", value: questions.filter(q => q.difficulty === "hard").length },
  ].filter(d => d.value > 0) // hide difficulties with zero count

  console.log(data)

  return (
      <PieChart width={500} height={300}>
        <text x={500 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
          <tspan fontSize="14">The distribution of questions by difficulty</tspan>
        </text>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
  )
}
