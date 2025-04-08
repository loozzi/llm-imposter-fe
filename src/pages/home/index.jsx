import React, { useState } from 'react'
import { Button } from '../../components/common/button'
import { history } from '../../configs/history'
import gameService from '../../services/game.service'

export const HomePage = () => {
  const [numberOfTeams, setNumberOfTeams] = useState(1)
  const [answerTimeout, setAnswerTimeout] = useState(120)

  const handleCreateGame = () => {
    console.log('numberOfTeams', numberOfTeams)
    if (numberOfTeams < 1) {
      alert('Số đội chơi AI phải lớn hơn 0')
      return
    }

    const payload = {
      min_players: 1,
      answer_timeout: answerTimeout
    }
    gameService.createGame(payload).then((res) => {
      console.log('res', res)
      try {
        for (let i = 0; i < numberOfTeams; i++) {
          const payload = {
            player_name: `AI ${i + 1}`,
            is_ai: true
          }
          gameService.joinGame(payload).then((res) => {
            console.log('res', res)
          })
        }
        history.push('/lobby')
      } catch (error) {
        console.error('Error redirecting to lobby:', error)
        alert('Tạo game thất bại')
      }
    })
  }

  return (
    <div>
      <h1
        style={{
          fontSize: 64
        }}
      >
        Ai là AI?
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label htmlFor='numberOfTeams'>
            <h2
              style={{
                fontSize: 32,
                marginBottom: 10
              }}
            >
              Nhập số đội AI cùng tham gia:
            </h2>
          </label>
          <input
            type='number'
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(e.target.value)}
            placeholder='Nhập số đội AI cùng tham gia'
            min='1'
            name='numberOfTeams'
            style={{
              width: 800,
              height: 64,
              fontSize: 20,
              border: '1px solid #ccc',
              paddingLeft: 10,
              fontSize: 32
            }}
          />
        </div>
        <div>
          <label htmlFor='numberOfTeams'>
            <h2
              style={{
                fontSize: 32,
                marginBottom: 10
              }}
            >
              Thời gian trả lời câu hỏi (giây):
            </h2>
          </label>
          <input
            type='number'
            value={answerTimeout}
            onChange={(e) => setAnswerTimeout(e.target.value)}
            placeholder='Thời gian trả lời câu hỏi (giây)'
            min='1'
            name='answerTimeout'
            style={{
              width: 800,
              height: 64,
              lineHeight: 1.5,
              fontSize: 20,
              border: '1px solid #ccc',
              paddingLeft: 10,
              fontSize: 32
            }}
          />
        </div>
        <Button onClick={handleCreateGame}>Tạo game</Button>
      </div>
      <div></div>
    </div>
  )
}
