import QuestionsCategoriesBar from './QuestionsCategoryBar';
import QuestionsDifficultyPie from './QuestionsDifficultyPie';

export default function Charts() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <QuestionsDifficultyPie />
      </div>
      <div className="flex-1">
        <QuestionsCategoriesBar />
      </div>
    </div>
  )
}