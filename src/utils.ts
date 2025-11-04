import type { CategoryQuery, CountGlobalQuery, QuestionQuery } from './types'

export async function getCategories(): Promise<CategoryQuery> {
    const response = await fetch("https://opentdb.com/api_category.php")
    if (!response.ok) throw new Error("Error fetching data")
    return response.json()
}

export async function getQuestions(category: number, token?: string): Promise<QuestionQuery> {
  const url = new URL("https://opentdb.com/api.php");
  url.searchParams.set("amount", "50");
  if (category !== -1) url.searchParams.set("category", category.toString());
  if (token) url.searchParams.set("token", token);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Error fetching questions");

  return response.json();
}


export async function getCountGlobal(): Promise<CountGlobalQuery> {
    const response = await fetch("https://opentdb.com/api_count_global.php")
    if (!response.ok) throw new Error("Error fetching global count")
    return response.json()
}
