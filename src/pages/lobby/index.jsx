import React, { useEffect, useState } from 'react'
import { Button } from '../../components/common/button'
import { history } from '../../configs/history'
import gameService from '../../services/game.service'
import qrImage from '../../assets/qr.jpg'
import avatars from '../../assets/avatars'

export const LobbyPage = () => {
  const [teams, setTeams] = useState([])
  const [teamNames, setTeamNames] = useState([])

  const handleStartGame = () => {
    gameService.startGame().then((res) => {
      console.log('res', res)
      if (res) {
        history.push('/game')
      } else {
        alert('Bắt đầu game thất bại')
      }
    })
  }

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await gameService.getActivePlayers()
        try {
          setTeams(response.active_player_ids)
          setTeamNames(response.active_player_names)
        } catch (error) {
          alert('Lấy danh sách đội chơi thất bại')
          console.error('Error fetching teams:', error)
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    }

    fetchTeams()
    const interval = setInterval(() => {
      fetchTeams()
    }, 2000) // Fetch teams every 2 seconds

    return () => clearInterval(interval) // Cleanup interval on component unmount
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
          <img src={qrImage} alt='QR Code' style={{ width: '100%', height: '100%' }} />
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
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: 128,

                  height: 'auto'
                }}
              >
                <div
                  style={{
                    width: 128,
                    height: 128,
                    overflow: 'hidden',
                    backgroundImage: `url(${avatars[index % avatars.length]})`,
                    backgroundSize: 'cover',
                    marginBottom: 10
                  }}
                />
                <span
                  style={{
                    fontSize: 28
                  }}
                >
                  {teamNames[index]}
                </span>
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
