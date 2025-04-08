import React, { useState } from 'react'
import { Button } from '../../components/common/button'
import gameService from '../../services/game.service'
import { history } from '../../configs/history'

export const JoinGamePage = () => {
  const [teamName, setTeamName] = useState('')

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
