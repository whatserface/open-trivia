import { Check } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Question } from '../types'

export default function QuestionCard({ id, question }: { id:number, question: Question }) {
  const color = question.difficulty === "easy"
    ? "bg-green-400"
    : question.difficulty === "medium"
    ? "bg-yellow-400"
    : "bg-red-400"
  let answers = [question.correct_answer, ...question.incorrect_answers]
  answers = answers.sort(() => Math.random() - 0.5)

  return (
    <div className="mb-4 p-4 border rounded-lg bg-white shadow">
      <div className="flex gap-2">
        <div className="text-base/7">{id}.</div>
        <Badge variant="secondary" className={`${color} capitalize my-1`}>Difficulty: {question.difficulty}</Badge>
      </div>
      
      <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{__html: question.category}} />
      <h3 className="text-lg font-semibold mb-2" dangerouslySetInnerHTML={{__html: question.question}} />
      <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
      {answers.map((answer) => {
        return (
          <Button
            key={answer}
            variant="outline"
            className="relative h-20 text-base justify-start gap-2"
          >
            {answer == question.correct_answer && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
            )}
            <span
              className="whitespace-normal"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </Button>
        )
      })}
    </div>
    </div>
  )
}
