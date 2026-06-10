const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const fs = require('fs'); // <--- Tambahkan ini

// Fungsi untuk membaca data dari file
function bacaData() {
    try {
        return JSON.parse(fs.readFileSync('data.json', 'utf8'));
    } catch (e) {
        return { transaksi: [], pengeluaran: [] };
    }
}
