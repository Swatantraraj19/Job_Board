import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Zap, Globe, TrendingUp } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">

      <div className="text-center py-20 px-4">
        <div className="inline-block p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl mb-6 transform hover:scale-105 transition-transform duration-300 ring-1 ring-inset ring-indigo-100 dark:ring-indigo-800">
          <Briefcase className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Find the <span className="text-indigo-600 dark:text-indigo-400">Work</span> You Love.
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The curated job board for developers, designers, and creators.
          Powered by real-time Hacker News data. Simple, fast, and no-nonsense.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Get Started Now
          </button>
          <button className="px-8 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-xl font-bold text-lg transition-all">
            Learn More
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 mb-20">
        <FeatureCard
          icon={<Zap className="w-6 h-6 text-amber-500" />}
          title="Real-time Updates"
          desc="Jobs are fetched live from the HN API, ensuring you see the freshest opportunities instantly."
        />
        <FeatureCard
          icon={<Globe className="w-6 h-6 text-blue-500" />}
          title="Remote First"
          desc="Find opportunities that let you work from anywhere in the world. Freedom comes standard."
        />
        <FeatureCard
          icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
          title="Top Tech Companies"
          desc="Connect with startups and giants like Y Combinator alumni, Google, and more."
        />
      </div>

    </div>
  )
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">{title}</h3>
    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

export default Home