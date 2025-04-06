import React, { useState } from 'react'
import { Button } from '../../components/common/button'
import { history } from '../../configs/history'

export const HomePage = () => {
  const [numberOfTeams, setNumberOfTeams] = useState(1)

  const handleCreateGame = () => {
    console.log('numberOfTeams', numberOfTeams)
    // fetch('api')

    history.push('/lobby')
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
              Nhập số đội chơi:
            </h2>
          </label>
          <input
            type='number'
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(e.target.value)}
            placeholder='Nhập số đội chơi tham gia'
            min='1'
            name='numberOfTeams'
            style={{
              width: 800,
              height: 40,
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
