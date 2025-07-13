const mysql = require('mysql2/promise');

// DB 연결 설정 (본인의 설정으로 변경)
const pool = mysql.createPool({
    host: '192.168.0.26',      // 또는 외부 IP
    user: 'root',
    password: 'Kangwoo0728!',
    database: 'discord_bot',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * 쿼리 실행 함수
 * @param {string} sql - 실행할 SQL 문
 * @param {Array} params - 바인딩할 파라미터 배열
 * @returns {Promise<any>} - 쿼리 결과
 */
async function query(sql, params = []) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (err) {
        console.error('[DB ERROR]', err);
        throw err;
    }
}

module.exports = {
    query
};

console.log("MySQL 연동완료")