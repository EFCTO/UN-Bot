// Mention-response.js
const responses = [
    "`/(명령어)`로 명령어를 사용해보세요!",
    "왜 부르셨나요?",
    "무슨 일인가요?"
];

module.exports = (client) => {
    client.on('messageCreate', message => {
        if (message.mentions.has(client.user) && !message.author.bot) {
            if (Math.random() < 0.01) {
                message.reply("이건 이스터에그에요. 1% 확률을 뚫으셨어요!");
            } else {
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                message.reply(randomResponse);
            }
        }
    });
};