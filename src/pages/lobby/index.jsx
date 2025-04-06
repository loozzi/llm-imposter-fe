import React, { useEffect, useState } from 'react'
import { Button } from '../../components/common/button'
import { history } from '../../configs/history'

export const LobbyPage = () => {
  const [teams, setTeams] = useState([
    { name: 'Team A', uid: '123' },
    { name: 'Team B', uid: '456' },
    { name: 'Team C', uid: '789' },
    { name: 'Team D', uid: '101' },
    { name: 'Team E', uid: '112' }
  ])

  const [qrCode, setQrCode] = useState('')

  const handleStartGame = () => {
    console.log('Starting game...')
    // Logic to start the game goes here
    history.push('/game')
  }

  useEffect(() => {
    // Simulate fetching QR code from server
    const fetchQrCode = async () => {
      // Replace with actual API call
      const qrCodeData = 'https://example.com/qr-code'
      setQrCode(qrCodeData)
    }

    fetchQrCode()
  }, [])

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Quét mã QR để vào game</h1>
        <div
          style={{
            width: '240px',
            height: '240px',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* QR code here */}
        </div>
      </div>
      <div
        style={{
          width: 640
        }}
      >
        <h2>Danh sách đội chơi</h2>
        {teams.length === 0 ? (
          <p>Chưa có đội nào tham gia</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
              gap: 10,
              marginTop: 20
            }}
          >
            {teams.map((team, index) => (
              <div
                key={team.uid}
                style={{
                  width: 128,
                  height: 128,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0'
                }}
              >
                {team.name}
              </div>
            ))}
          </div>
        )}
        {teams.length > 0 && (
          <Button
            style={{
              marginTop: 20
            }}
            onClick={handleStartGame}
          >
            Bắt đầu game
          </Button>
        )}
      </div>
    </div>
  )
}
