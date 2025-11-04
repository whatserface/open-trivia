import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../utils'
import { ScrollArea } from './ui/scroll-area'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { useState } from 'react'
import Questions from './Questions'

  export default function Categories() {
    const [selectedCategory, setSelectedCategory] = useState<number>(-1)
    const { data, error } = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    })

    if (error) return <>Error fetching categories</>


    return (
      <div className="grid grid-cols-4">
        <aside className="border-r p-4 sticky top-4 h-[calc(100vh-1rem)] ">
          <h2 className="text-lg font-semibold mb-3">Select category of questions</h2>
          <ScrollArea className="h-[85vh]">
            <div className="grid gap-3">
              {data?.trivia_categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2 hover:bg-accent/50">
                  <Checkbox
                    id={category.id.toString()} 
                    checked={category.id === selectedCategory}//checked.includes(item)}
                    onCheckedChange={
                      () => category.id === selectedCategory
                        ? setSelectedCategory(-1)
                        : setSelectedCategory(category.id)
                    }
                    className="transform transition-transform duration-150 scale-100 data-[state=checked]:scale-110"
                  />
                  <Label htmlFor={category.id.toString()}>{category.name}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main content: 3/4 */}
        <main className="col-span-3 p-6">
          <h1 className="text-2xl font-bold mb-4">Questions</h1>
          <Questions category={selectedCategory} />
        </main>
      </div>
    )
  }