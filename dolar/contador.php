
<!-- filepath: /c:/Projetos/tech/dolar/contador.php -->
<?php
$file = 'contadordolar.txt';

// Verifica se o arquivo existe, se não, cria o arquivo e inicializa o contador
if (!file_exists($file)) {
    file_put_contents($file, '0');
}

// Lê o valor atual do contador
$counter = (int)file_get_contents($file);

// Incrementa o contador
$counter++;

// Salva o novo valor do contador no arquivo
file_put_contents($file, (string)$counter);

// Retorna o valor do contador
echo $counter;
?>