import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button } from '../../components/common/button'
import gameService from '../../services/game.service'

export const AnswerPage = () => {
  const params = useParams()
  const [question, setQuestion] = useState('')
  const [players, setPlayers] = useState([])
  const [answer, setAnswer] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(120)

  const [answered, setAnswered] = useState(false)
  const [playerStatus, setPlayerStatus] = useState('')
  const [gameStatus, setGameStatus] = useState('waiting')

  const handleGetQuestion = () => {
    gameService
      .getGameState()
      .then((res) => {
        console.log('res', res)
        if (res) {
          const player = res.players.find((player) => player.id === params.team_uid)
          if (player === undefined) {
            setPlayerStatus('Người chơi không hợp lệ')
            return
          }

          if (player.eliminated === true) {
            setPlayerStatus('Người chơi đã bị loại')
            return
          }

          setQuestion(res.current_question || '')
          setTimeRemaining(res.remaining_time)
          setPlayers(res.players)
          setGameStatus(res.status)

          const answeredPlayer = res.answers.find((answer) => answer.player_id === params.team_uid)
          if (answeredPlayer) {
            setAnswer(answeredPlayer.answer)
            console.log('answeredPlayer', answeredPlayer)
            setAnswered(true)
          } else {
            setAnswered(false)
          }
        } else {
          alert('Lấy dữ liệu game thất bại')
        }
      })
      .catch((err) => {
        console.log('err', err)
        alert('Lấy dữ liệu game thất bại')
      })
  }

  const handleSubmitAnswer = () => {
    // fetch submit answer from api
    console.log('answer', answer)
    const payload = {
      answer: answer,
      player_id: params.team_uid
    }
    gameService.submitAnswer(payload).then((res) => {
      console.log('res', res)
      if (res) {
        setAnswered(true)
      } else {
        alert('Gửi đáp án thất bại')
      }
    })
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1)
      }
      if (timeRemaining === 0) {
        handleSubmitAnswer()
        clearInterval(myInterval)
        setAnswered(true)
        // setPlayerStatus('Thời gian đã hết')
        setGameStatus('waiting')
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [timeRemaining])

  useEffect(() => {
    handleGetQuestion()
  }, [params.team_uid])

  if (playerStatus !== '') {
    return (
      <div
        style={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            display: 'block',
            marginBottom: 20,
            marginTop: 20,
            textAlign: 'start'
          }}
        >
          {playerStatus}
        </span>
      </div>
    )
  } else
    return (
      <div
        style={{
          height: 'calc(100vh - 64px)'
        }}
      >
        <Button onClick={handleGetQuestion}>Lấy câu hỏi</Button>
        {question.length > 0 && (
          <>
            <span
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                display: 'block',
                marginBottom: 20,
                marginTop: 20,
                textAlign: 'start'
              }}
            >
              Thời gian còn lại: {timeRemaining} giây
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                display: 'block',
                marginBottom: 20,
                marginTop: 20,
                textAlign: 'start'
              }}
            >
              Câu hỏi: {question}
            </span>

            <textarea
              style={{
                width: 'calc(100% - 60px)',
                height: 400,
                fontSize: 24,
                padding: 20,
                borderRadius: 8,
                border: '1px solid #ccc',
                resize: 'none',
                marginBottom: 20
              }}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder='Nhập đáp án của bạn tại đây'
              rows={10}
              disabled={answered} // Disable the textarea if the player has already answered
            />
            {!answered && <Button onClick={handleSubmitAnswer}>Gửi đáp án</Button>}
          </>
        )}

        {gameStatus === 'waiting' && (
          <span
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              display: 'block',
              marginBottom: 20,
              marginTop: 20,
              textAlign: 'start'
            }}
          >
            Trạng thái game: Đang chờ
          </span>
        )}
      </div>
    )
}
