import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button } from '../../components/common/button'

export const AnswerPage = () => {
  const params = useParams()
  const [question, setQuestion] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse molestias sapiente totam qui quasi nesciunt provident doloribus quo? Eligendi, consectetur explicabo. Ullam numquam commodi nemo fugiat expedita, sed facilis?'
  )
  const [answer, setAnswer] = useState('')

  const handleGetQuestion = () => {
    // fetch question from api
    setAnswer('')
  }

  const handleSubmitAnswer = () => {
    // fetch submit answer from api
    console.log('answer', answer)
    setAnswer('')
  }

  useEffect(() => {
    const { team_uid } = params
    console.log('team_uid', team_uid)
  }, [params])

  return (
    <div
      style={{
        height: 'calc(100vh - 64px)'
      }}
    >
      <Button onClick={handleGetQuestion}>Lấy câu hỏi</Button>
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
      />
      <Button onClick={handleSubmitAnswer}>Gửi đáp án</Button>
    </div>
  )
}
