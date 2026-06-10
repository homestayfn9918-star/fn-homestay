const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname));

// Fungsi Baca/Tulis Data ke file data.json
function bacaData() {
    try {
        if (fs.existsSync('data.json')) {
            return JSON.parse(fs.readFileSync('data.json', 'utf8'));
        }
    } catch (e) { console.error("Gagal baca data", e); }
    return { transaksi: [], pengeluaran: [] };
}

function simpanData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

let databaseSistem = bacaData();

io.on('connection', (socket) => {
    socket.emit('updateData', databaseSistem);

    socket.on('transaksiBaru', (data) => {
        // Menambahkan Tanggal Masuk otomatis
        data.tx.tanggalMasuk = new Date().toLocaleString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        
        databaseSistem.transaksi.push(data.tx);
        simpanData(databaseSistem);
        io.emit('updateData', databaseSistem);
    });

    socket.on('hapusTransaksi', (index) => {
        databaseSistem.transaksi.splice(index, 1);
        simpanData(databaseSistem);
        io.emit('updateData', databaseSistem);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server online di port ${PORT}`));
