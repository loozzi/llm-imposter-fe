import React, { useState } from 'react'
import { Button } from '../../components/common/button'
import { history } from '../../configs/history'

export const ScoreBoardPage = () => {
  const [scores, setScores] = useState([
    { team: 'Team A', score: 70, answer: 'Answer A' },
    { team: 'Team B', score: 63, answer: 'Answer B' },
    { team: 'Team C', score: 49, answer: 'Answer C' },
    { team: 'Team D', score: 35, answer: 'Answer D' },
    { team: 'Team E', score: 17, answer: 'Answer E' }
  ])

  const handleContinue = () => {
    history.push('/game')
  }

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
              <td>{item.team}</td>
              <td>{item.answer}</td>
              <td>{item.score}</td>
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
