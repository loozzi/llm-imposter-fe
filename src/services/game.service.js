import axiosInstance from './axios.service';
class GameService {
    constructor(axios) {
        this.axios = axios;
    }

    async getGameState() {
        try {
            const response = await this.axios.get(`/game_state`);
            return response;
        } catch (error) {
            console.error('Error fetching game state:', error);
            throw error;
        }
    }

    async getQrJoinCode() {
        try {
            const response = await this.axios.get(`/game_qr`);
            return response;
        } catch (error) {
            console.error('Error fetching QR join code:', error);
            throw error;
        }
    }


    async getActivePlayers() {
        try {
            const response = await this.axios.get(`/active_players`);
            return response;
        } catch (error) {
            console.error('Error fetching active player:', error);
            throw error;
        }
    }

    async createGame(data) {
        try {
            const response = await this.axios.post('/create_game', data);
            return response;
        } catch (error) {
            console.error('Error creating game:', error);
            throw error;
        }
    }

    async startGame() {
        try {
            const response = await this.axios.post('/start_game');
            return response;
        } catch (error) {
            console.error('Error starting game:', error);
            throw error;
        }
    }

    async joinGame(data) {
        try {
            const response = await this.axios.post('/add_player', data);
            return response;
        } catch (error) {
            console.error('Error joining game:', error);
            throw error;
        }
    }

    async submitAnswer(data) {
        try {
            const response = await this.axios.post('/submit_answer', data);
            return response;
        } catch (error) {
            console.error('Error submitting answer:', error);
            throw error;
        }
    }

    async nextTurn() {
        try {
            const response = await this.axios.post('/next_turn');
            return response;
        } catch (error) {
            console.error('Error fetching next turn:', error);
            throw error;
        }
    }

    async ranking() {
        try {
            const response = await this.axios.post('/rank_answers');
            return response;
        }
        catch (error) {
            console.error('Error fetching ranking:', error);
            throw error;
        }
    }

    async playTurnAI() {
        try {
            const response = await this.axios.post('/play_turn_ai');
            return response;
        } catch (error) {
            console.error('Error playing turn AI:', error);
            throw error;
        }
    }

    async eliminatePlayer(playerId) {
        try {
            const response = await this.axios.post('/eliminate_player', { player_id: playerId });
            return response;
        } catch (error) {
            console.error('Error eliminating player:', error);
            throw error;
        }
    }
}

const gameService = new GameService(axiosInstance);
export default gameService;