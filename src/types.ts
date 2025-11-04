type Category = {
    id: number,
    name: string
}

export type CategoryQuery = {
    trivia_categories: Category[]
}

export type Question = {
    type: "multiple" | "boolean",
    difficulty: "easy" | "medium" | "hard",
    category: Category["name"],
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type QuestionQuery = {
    response_code: number,
    results: Question[]
}

type Count = {
    total_num_of_questions: number,
    total_num_of_pending_questions: number,
    total_num_of_verified_questions: number,
    total_num_of_rejected_questions: number
}

export type CountGlobalQuery = {
    overall: Count,
    categories: Record<number, Count>
}
