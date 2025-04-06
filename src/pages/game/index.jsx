import React, { useEffect, useState } from 'react'

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export const GamePage = () => {
  const [timeRemaining, setTimeRemaining] = useState(114)
  const [question, setQuestion] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse molestias sapiente totam qui quasi nesciunt provident doloribus quo? Eligendi, consectetur explicabo. Ullam numquam commodi nemo fugiat expedita, sed facilis?'
  )
  const [answers, setAnswers] = useState([
    {
      team: 'Team 1',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse molestias sapiente totam qui quasi nesciunt provident doloribus quo? Eligendi, consectetur explicabo. Ullam numquam commodi nemo fugiat expedita, sed facilis?'
    },
    {
      team: 'Team 2',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse molestias sapiente totam qui quasi nesciunt provident doloribus quo? Eligendi, consectetur explicabo. Ullam numquam commodi nemo fugiat expedita, sed facilis?'
    },
    {
      team: 'Team 3',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse molestias sapiente totam qui quasi nesciunt provident doloribus quo? Eligendi, consectetur explicabo. Ullam numquam commodi nemo fugiat expedita, sed facilis?'
    },
    {
      team: 'Team 4',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse molestias sapiente totam qui quasi nesciunt provident doloribus quo? Eligendi, consectetur explicabo. Ullam numquam commodi nemo fugiat expedita, sed facilis?'
    },
    {
      team: 'Team 5',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse molestias sapiente totam qui quasi nesciunt provident doloribus quo? Eligendi, consectetur explicabo. Ullam numquam commodi nemo fugiat expedita, sed facilis?'
    }
  ])

  useEffect(() => {
    const fetchGameData = async () => {
      // Simulate fetching game data from an API
      const response = await fetch('https://api.example.com/game')
      const data = await response.json()
      setTimeRemaining(data.timeRemaining)
      setQuestion(data.question)
      setAnswers(data.answers)
    }

    fetchGameData()
  }, [])

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1)
        // get answer from api
        // setAnswers((prevAnswers) => [...prevAnswers, newAnswer])
      }
      if (timeRemaining === 0) {
        history.push('/score_board')
        clearInterval(myInterval)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <div
      style={{
        height: 'calc(100vh - 64px)',
        padding: 0,
        margin: 0
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: 28, justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
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
            #5 đội còn lại
          </span>
        </div>
        <div
          style={{
            fontSize: 40,
            textAlign: 'left'
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
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h2>Câu trả lời của các đội:</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 600, overflowY: 'auto' }}>
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
                  width: 120
                }}
              >
                {answer.team}:
              </span>
              <span>{answer.answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
