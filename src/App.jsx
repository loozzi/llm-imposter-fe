import { Route, Routes } from 'react-router'
import './App.css'
import { AnswerPage } from './pages/answer'
import { GamePage } from './pages/game'
import { HomePage } from './pages/home'
import { ScoreBoardPage } from './pages/score_board'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/game' element={<GamePage />} />
      <Route path='/answer/:team_uid' element={<AnswerPage />} />
      <Route path='/score_board' element={<ScoreBoardPage />} />
    </Routes>
  )
}

export default App
