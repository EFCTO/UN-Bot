console.log('🟢 test 파일 실행완료');

const mysql = require('mysql2/promise');

console.log('🟢 DB 모듈 로드 시작');

const pool = mysql.createPool({
    host: '192.168.0.26',
    user: 'root',
    password: 'Kangwoo0728!',
    database: 'discord_bot',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('🟢 커넥션 풀 생성됨');

async function query(sql, params = []) {
    console.log('🟢 query() 진입:', sql, params);
    try {
        const [rows] = await pool.execute(sql, params);
        console.log('🟢 쿼리 실행 완료');
        return rows;
    } catch (err) {
        console.error('[DB ERROR]', err);
        throw err;
    }
}

module.exports = {
    query
};

setTimeout(() => {
    console.log('⏰ 5초 지남 - 여전히 실행 중');
}, 5000);

console.log("✅ db.js 정상 로드 완료");

console.log("db.js")