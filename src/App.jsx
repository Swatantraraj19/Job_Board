import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import JobLists from './components/JobLists'


function App() {
  const [category, setCategory] = useState('jobstories');

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-start p-4 gap-6">
      
      <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-200 flex gap-2">
        <button
          onClick={() => setCategory('jobstories')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'jobstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          Jobs
        </button>
        <button
          onClick={() => setCategory('topstories')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'topstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          Top Stories
        </button>
        <button
          onClick={() => setCategory('newstories')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'newstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          New Stories
        </button>
      </div>

      <JobLists category={category} />
    </div>
  )
}

export default App
