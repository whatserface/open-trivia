import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import QuestionCard from "./Question"
import { getQuestions } from "../utils"
import type { Question } from "@/types"

export default function Questions({ category }: { category: number }) {
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const queryClient = useQueryClient()
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const res = await fetch("https://opentdb.com/api_token.php?command=request")
      if (!res.ok) throw new Error("Failed to get token")
      const json = await res.json()
      return json.token as string
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const token = tokenData ?? null

  const {
    data: questionsData,
    error: questionsError,
    isLoading: questionsLoading,
  } = useQuery({
    queryKey: ["questions", category, token],
    queryFn: () => (getQuestions(category, token!)),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
    retry: false,
  })
  

  useEffect(() => {
    if (!questionsData?.results) return
    queryClient.setQueryData<Question[]>(
      ["questions-cache", category],
      (old: Question[] | undefined) => {
        // we don't add duplicates in case the cache didn't change
        const prev = old ?? []
        const existing = new Set(prev.map(q => q.question))
        const incoming = Array.isArray(questionsData.results) ? questionsData.results : []
        const toAdd = incoming.filter(q => !existing.has(q.question))
        if (toAdd.length === 0) return prev
        return [...prev, ...toAdd]
      }
    )

    const latest = queryClient.getQueryData<Question[]>(["questions-cache", category]) || []
    setAllQuestions(latest)
  }, [questionsData, category, queryClient, allQuestions.length])

  const mergeIntoCacheAndState = (incoming: Question[]) => {
    const old: Question[] = queryClient.getQueryData(["questions-cache", category]) || []
    const merged = [...old, ...incoming]
    queryClient.setQueryData(["questions-cache", category], merged)
    setAllQuestions(merged)
    return merged
  }

  const loadMoreQuestions = async () => {
    if (!token) return
    setLoadingMore(true)
  
    try {
      const newData = await getQuestions(category, token)
  
      if (newData.response_code === 5) {
        // 429 / too many requests
        alert("Too many requests. Please try again later.")
        return // exit early, don’t merge anything
      }
  
      if (newData.results && newData.results.length > 0) {
        mergeIntoCacheAndState(newData.results)
      }
    } catch (err) {
      console.error(err)
      alert("Error fetching more questions.")
    } finally {
      setLoadingMore(false)
    }
  }

  const initialLoading =
    tokenLoading || (questionsLoading && allQuestions.length === 0)

  if (initialLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    )

  if ((tokenError || questionsError) && allQuestions.length === 0)
    return <div className="text-center text-red-500">Error fetching questions</div>

  return (
    <div>
      {allQuestions.map((question, index) => (
        <QuestionCard key={index} id={index + 1} question={question} />
      ))}

      {loadingMore ? (
        <div className="flex justify-center mt-4">
          <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
        </div>
      ) : (
        <Button
          className="mx-auto block hover:cursor-pointer mt-4"
          onClick={loadMoreQuestions}
        >
          Load next questions
        </Button>
      )}
    </div>
  )
}
