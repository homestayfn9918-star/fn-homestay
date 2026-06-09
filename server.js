const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'resepsionis.html'));
});

app.get('/owner', (req, res) => {
    res.sendFile(path.join(__dirname, 'owner.html'));
});

app.use(express.static(__dirname));

// DATABASE PUSAT (MENDUKUNG JURNAL TAMU & JURNAL OPERASIONAL)
let databaseSistem = {
    daftarKamar: [
        // ====== HOMESTAY FN18 TAHUNAN ======
        { id: 'FN18-29', homestay: 'FN18 TAHUNAN', nomor: '29', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-30', homestay: 'FN18 TAHUNAN', nomor: '30', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-31', homestay: 'FN18 TAHUNAN', nomor: '31', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-32', homestay: 'FN18 TAHUNAN', nomor: '32', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-33', homestay: 'FN18 TAHUNAN', nomor: '33', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-34', homestay: 'FN18 TAHUNAN', nomor: '34', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-35', homestay: 'FN18 TAHUNAN', nomor: '35', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-36', homestay: 'FN18 TAHUNAN', nomor: '36', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-37', homestay: 'FN18 TAHUNAN', nomor: '37', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-38', homestay: 'FN18 TAHUNAN', nomor: '38', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-39', homestay: 'FN18 TAHUNAN', nomor: '39', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-40', homestay: 'FN18 TAHUNAN', nomor: '40', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-41', homestay: 'FN18 TAHUNAN', nomor: '41', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-42', homestay: 'FN18 TAHUNAN', nomor: '42', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-43', homestay: 'FN18 TAHUNAN', nomor: '43', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN18-44', homestay: 'FN18 TAHUNAN', nomor: '44', fasilitas: 'Kipas, Kmr Mandi Dalam, TV' },
        { id: 'FN18-45', homestay: 'FN18 TAHUNAN', nomor: '45', fasilitas: 'Kipas, Kmr Mandi Dalam, TV' },
        { id: 'FN18-46', homestay: 'FN18 TAHUNAN', nomor: '46', fasilitas: 'Kipas, Kmr Mandi Dalam, TV' },
        { id: 'FN18-47', homestay: 'FN18 TAHUNAN', nomor: '47', fasilitas: 'Kipas, Kmr Mandi Dalam, TV' },
        { id: 'FN18-48', homestay: 'FN18 TAHUNAN', nomor: '48', fasilitas: 'Kipas, Kmr Mandi Dalam, TV' },
        
        // ====== HOMESTAY FN99 MULYOHARJO ======
        { id: 'FN99-01', homestay: 'FN99 MULYOHARJO', nomor: '01', fasilitas: 'Kipas kmmd luar' },
        { id: 'FN99-02', homestay: 'FN99 MULYOHARJO', nomor: '02', fasilitas: 'Kipas kmmd dalam, TV' },
        { id: 'FN99-03', homestay: 'FN99 MULYOHARJO', nomor: '03', fasilitas: 'Kipas kmmd dalam, TV' },
        { id: 'FN99-04', homestay: 'FN99 MULYOHARJO', nomor: '04', fasilitas: 'AC, Kmr Mandi Dalam' },
        { id: 'FN99-05', homestay: 'FN99 MULYOHARJO', nomor: '05', fasilitas: 'AC, Kmr Mandi Dalam' },
        { id: 'FN99-07', homestay: 'FN99 MULYOHARJO', nomor: '07', fasilitas: 'AC, Kmr Mandi Dalam' },
        { id: 'FN99-08', homestay: 'FN99 MULYOHARJO', nomor: '08', fasilitas: 'AC, Kmr Mandi Dalam' },
        { id: 'FN99-09', homestay: 'FN99 MULYOHARJO', nomor: '09', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN99-10', homestay: 'FN99 MULYOHARJO', nomor: '10', fasilitas: 'Kipas, Kmr Mandi Dalam, TV / AC TV' },
        { id: 'FN99-11', homestay: 'FN99 MULYOHARJO', nomor: '11', fasilitas: 'Kipas, Kmr Mandi Dalam' },
        { id: 'FN99-12', homestay: 'FN99 MULYOHARJO', nomor: '12', fasilitas: 'Kipas, Kmr Mandi Dalam, TV / AC TV' },
        { id: 'FN99-14', homestay: 'FN99 MULYOHARJO', nomor: '14', fasilitas: 'VIP (AC, TV, Water Heater)' },
        { id: 'FN99-15', homestay: 'FN99 MULYOHARJO', nomor: '15', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN99-16', homestay: 'FN99 MULYOHARJO', nomor: '16', fasilitas: 'AC, Kmr Mandi Dalam, TV' },
        { id: 'FN99-17', homestay: 'FN99 MULYOHARJO', nomor: '17', fasilitas: 'Kipas, Kmr Mandi Dalam, TV / AC TV' },
        { id: 'FN99-18', homestay: 'FN99 MULYOHARJO', nomor: '18', fasilitas: 'Kipas, Kmr Mandi Dalam, TV / AC TV' }
    ],
    logTransaksi: [],
    logPengeluaran: [], // Database baru penampung pengeluaran operasional harian
    statusKamar: {}
};

io.on('connection', (socket) => {
    socket.emit('initData', databaseSistem);

    // 1. INPUT JURNAL TAMU BARU
    socket.on('transaksiBaru', (data) => {
        databaseSistem.logTransaksi.unshift(data.tx);
        databaseSistem.statusKamar[data.keyKamar] = { status: data.tx.status, tamu: data.tx.namaTamu };
        io.emit('updateSistem', databaseSistem);
    });

    // 2. INPUT PENGELUARAN OPERASIONAL BARU (DARI RESEPSIONIS)
    socket.on('pengeluaranBaru', (data) => {
        databaseSistem.logPengeluaran.unshift(data);
        io.emit('updateSistem', databaseSistem);
    });

    // 3. UBAH STATUS HUNIAN KAMAR
    socket.on('ubahStatusTamu', (payload) => {
        const tx = databaseSistem.logTransaksi[payload.indexLog];
        if (tx) {
            tx.status = payload.statusBaru;
            if (payload.statusBaru === 'Completed / Check-Out') {
                databaseSistem.statusKamar[tx.keyKamar] = { status: 'KOSONG', tamu: '' };
            } else {
                databaseSistem.statusKamar[tx.keyKamar] = { status: payload.statusBaru, tamu: tx.namaTamu };
            }
            io.emit('updateSistem', databaseSistem);
        }
    });

    // 4. OWNER: HAPUS JURNAL TAMU
    socket.on('ownerHapusTransaksi', (payload) => {
        const index = payload.indexLog;
        if(databaseSistem.logTransaksi[index]) {
            const keyKamarTerlibat = databaseSistem.logTransaksi[index].keyKamar;
            databaseSistem.logTransaksi.splice(index, 1);
            databaseSistem.statusKamar[keyKamarTerlibat] = { status: 'KOSONG', tamu: '' };
            io.emit('updateSistem', databaseSistem);
        }
    });

    // 5. OWNER: HAPUS LOG PENGELUARAN OPERASIONAL
    socket.on('ownerHapusPengeluaran', (payload) => {
        const index = payload.indexLog;
        if(databaseSistem.logPengeluaran[index]) {
            databaseSistem.logPengeluaran.splice(index, 1);
            io.emit('updateSistem', databaseSistem);
        }
    });
});

const PORT = 3000;
// GANTI BAGIAN server.listen PALING BAWAH DI server.js MENJADI:
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Sistem online di port ${PORT}`);
});
    console.log(`Sistem Sinkronisasi FN Homestay Aktif di Port ${PORT}`);
});
