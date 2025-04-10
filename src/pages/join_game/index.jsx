import React, { useEffect, useState } from 'react'
import { Button } from '../../components/common/button'
import gameService from '../../services/game.service'
import { history } from '../../configs/history'

export const JoinGamePage = () => {
  const [teamName, setTeamName] = useState('')
  const [isGameWaiting, setIsGameWaiting] = useState(false)

  const handleJoinGame = () => {
    if (!teamName) {
      alert('Tên đội không được để trống')
      return
    }

    const payload = {
      player_name: teamName,
      is_ai: false
    }

    gameService.joinGame(payload).then((res) => {
      console.log('res', res)
      try {
        history.push(`/answer/${res.player_id}`)
      } catch (error) {
        console.error('Error redirecting to lobby:', error)
        alert('Tham gia game thất bại')
      }
    })
  }

  useEffect(() => {
    gameService
      .getGameState()
      .then((res) => {
        console.log('res', res)
        if (res) {
          if (res.status === 'waiting') {
            setIsGameWaiting(true)
          } else {
            setIsGameWaiting(false)
          }
        } else {
          setIsGameWaiting(false)
        }
      })
      .catch((err) => {
        setIsGameWaiting(false)
      })
  }, [])

  if (!isGameWaiting)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <h1 style={{ fontSize: 64 }}>Vui lòng chờ game mới nhé người đẹp...</h1>
      </div>
    )
  else
    return (
      <div>
        <div>
          <label htmlFor='numberOfTeams'>
            <h2
              style={{
                fontSize: 32,
                marginBottom: 10
              }}
            >
              Tên đội của bạn:
            </h2>
          </label>
          <input
            type='text'
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder='Nhập tên đội của bạn'
            min='1'
            name='teamName'
            style={{
              width: '100%',
              height: 64,
              fontSize: 20,
              border: '1px solid #ccc',
              paddingLeft: 10,
              fontSize: 32,
              marginBottom: 20
            }}
          />
        </div>
        <Button onClick={handleJoinGame}>Tham gia ngay</Button>
      </div>
    )
}
