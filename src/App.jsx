import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import JobLists from './components/JobLists'
import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import ItemDetails from './components/ItemDetails'


function App() {
  const [category, setCategory] = useState('jobstories');
   
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-start p-4 gap-6">
      
      <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-200 flex gap-2">
        <button
          onClick={() => {setCategory('jobstories');navigate('/')}}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'jobstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          Jobs
        </button>
        <button
          onClick={() =>{setCategory('topstories');;navigate('/')}}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'topstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          Top Stories
        </button>
        <button
          onClick={() => {setCategory('newstories');;navigate('/')}}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${category === 'newstories' ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
        >
          New Stories
        </button>
      </div>

      <Routes>

        <Route path="/" element={<JobLists category={category} />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>

      
    </div>
  )
}

export default App
