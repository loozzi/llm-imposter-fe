import React, { useEffect, useState } from 'react'
import { Button } from '../../components/common/button'
import { history } from '../../configs/history'
import gameService from '../../services/game.service'
import './score_board.css'

export const ScoreBoardPage = () => {
  const [scores, setScores] = useState([])

  const [winner, setWinner] = useState('')
  const [players, setPlayers] = useState([])

  const handleContinue = () => {
    history.push('/game')
  }

  useEffect(() => {
    gameService
      .ranking()
      .then((res) => {
        console.log('res', res)
        if (res) {
          setScores(res.scores.sort((a, b) => b.rank - a.rank))
          setPlayers(res.players)
        } else {
          alert('Lấy dữ liệu game thất bại')
        }
      })
      .catch((err) => {
        console.log('err', err)
        alert('Lấy dữ liệu game thất bại')
      })
  }, [])

  useEffect(() => {
    if (scores.length > 0) {
      const badScorePlayer = scores[scores.length - 1].player_id

      gameService
        .eliminatePlayer(badScorePlayer)
        .then((res) => {
          console.log('res', res)
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }, [scores])

  return (
    <div
      style={{
        width: 1200
      }}
    >
      <h1
        style={{
          fontSize: 64,
          textAlign: 'center',
          marginBottom: 32,
          fontWeight: 'bold'
        }}
      >
        BẢNG ĐIỂM
      </h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 32 }}>
        <thead style={{ backgroundColor: '#f0f0f0', height: 50 }}>
          <tr>
            <th style={{ width: '15%', borderBottom: '2px solid #000' }}>Đội chơi</th>
            <th style={{ width: '60%', borderBottom: '2px solid #000' }}>Đáp án</th>
            <th style={{ width: '25%', borderBottom: '2px solid #000' }}>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item, index) => (
            <tr
              key={index}
              style={{
                borderBottom: '1px solid #ccc',
                height: 50,
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                background: index === 0 ? '#91EE66' : index === scores.length - 1 ? '#f44336' : 'inherit'
              }}
            >
              <td>{players.find((p) => p.id === item.player_id).name}</td>
              <td className='answer-text'>{item.answer}</td>
              <td>{item.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        style={{
          marginTop: 32
        }}
        onClick={handleContinue}
      >
        Tiếp tục
      </Button>
    </div>
  )
}
