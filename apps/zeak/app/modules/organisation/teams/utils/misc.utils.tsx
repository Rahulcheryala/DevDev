
const generateTeamCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    const timestamp = new Date().getTime().toString().slice(-4);
    let result = '';
    for (let i = 0; i < length / 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    result += timestamp;
    return result;
};

export { generateTeamCode };