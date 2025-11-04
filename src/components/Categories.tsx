import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../utils"
import { useState } from "react"
import Questions from "./Questions"

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<number>(-1)
  const { data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  if (error) return <>Error fetching categories</>

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent className="p-4">
            <ScrollArea className="h-[80vh]">
              <div className="grid gap-3">
                {data?.trivia_categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2 hover:bg-accent/50">
                    <Checkbox
                      id={category.id.toString()}
                      checked={category.id === selectedCategory}
                      onCheckedChange={() =>
                        category.id === selectedCategory
                          ? setSelectedCategory(-1)
                          : setSelectedCategory(category.id)
                      }
                    />
                    <Label htmlFor={category.id.toString()}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Header with sidebar trigger + category title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h2 className="text-lg md:text-xl font-semibold">
                Select category of questions
              </h2>
            </div>
          </div>
          
          <h2 className="text-lg md:text-xl font-semibold my-2">Questions</h2>
          <Questions category={selectedCategory} />
        </main>
      </div>
    </SidebarProvider>
  )
}
