const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/contador', (req, res) => {
    const filePath = path.join(__dirname, 'contadordolar.txt');

    // Verifica se o arquivo existe, se não, cria o arquivo e inicializa o contador
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '0');
    }

    // Lê o valor atual do contador
    let counter = parseInt(fs.readFileSync(filePath, 'utf8'));

    // Incrementa o contador
    counter++;

    // Salva o novo valor do contador no arquivo
    fs.writeFileSync(filePath, counter.toString());

    // Retorna o valor do contador
    res.send(counter.toString());
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});