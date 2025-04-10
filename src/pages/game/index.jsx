import React, { useEffect, useState } from 'react'
import { Button } from '../../components/common/button'
import { history } from '../../configs/history'
import gameService from '../../services/game.service'
import { Loader } from '../../components/common/loader'

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export const GamePage = () => {
  const [timeRemaining, setTimeRemaining] = useState(114)
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [players, setPlayers] = useState([])
  const [isNextTurn, setIsNextTurn] = useState(false)

  useEffect(() => {
    const fetchGameData = async () => {
      gameService
        .nextTurn()
        .then((res) => {
          console.log('res', res)
          setIsNextTurn(true)
          gameService
            .playTurnAI()
            .then((res) => {
              console.log('res', res)
            })
            .catch((err) => {
              console.log('err', err)
            })
        })
        .catch((err) => {
          console.log('err', err)
        })
    }

    fetchGameData()
  }, [])

  const handleRedirectToScoreBoard = () => {
    history.push('/score_board')
  }

  useEffect(() => {
    if (isNextTurn) {
      let myInterval = setInterval(() => {
        if (timeRemaining > 0) {
          // setTimeRemaining(timeRemaining - 1)
          gameService.getGameState().then((res) => {
            console.log('res', res)
            if (res) {
              setQuestion(res.current_question || '')
              setTimeRemaining(res.remaining_time)
              setAnswers(res.answers)
              setPlayers(res.players)
            } else {
              alert('Lấy dữ liệu game thất bại')
              history.push('/')
            }
          })
        }
        if (timeRemaining === 0) {
          history.push('/score_board')
          clearInterval(myInterval)
        }
      }, 1000)
      return () => {
        clearInterval(myInterval)
      }
    }
  }, [isNextTurn])

  if (isNextTurn)
    return (
      <div
        style={{
          height: 'calc(100vh - 64px)',
          padding: 0,
          margin: 0
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap: 28, justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', width: 250 }}>
            <span
              style={{
                fontSize: 120
              }}
            >
              {formatTime(timeRemaining)}
            </span>
            <span
              style={{
                fontSize: 28
              }}
            >
              {`#${players.filter((e) => !e.eliminated).length}`} đội còn lại
            </span>
          </div>
          <div
            style={{
              fontSize: 40,
              textAlign: 'left',
              flex: 1
            }}
          >
            Câu hỏi: {question}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 16,
            marginTop: 32,
            borderRadius: 8,
            backgroundColor: '#f0f0f0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: 600
          }}
        >
          <h2>Câu trả lời của các đội:</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 540, overflowY: 'auto' }}>
            {answers.map((answer, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: 16,
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                    marginRight: 8,
                    minWidth: 120,
                    textAlign: 'left'
                  }}
                >
                  {players.find((player) => player.id === answer.player_id)?.name || 'Đội chơi'}:
                </span>
                <span>{answer.answer}</span>
              </div>
            ))}
          </div>
        </div>
        <Button
          style={{
            marginTop: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={handleRedirectToScoreBoard}
        >
          Xem kết quả
        </Button>
      </div>
    )
  else return <Loader loading={true} />
}
