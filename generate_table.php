<?php
header('Content-Type: application/json');

function randomCharacter() {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return $alphabet[rand(0, strlen($alphabet) - 1)];
}

$rows = isset($_POST['rows']) ? intval($_POST['rows']) : 10;
$alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

$table = '<table>';
$table .= '<tr><td></td>';

for ($i = 0; $i < 26; $i++) {
    $table .= '<th>' . $alphabet[$i] . '</th>';
}

$table .= '</tr>';

for ($i = 1; $i <= $rows; $i++) {
    $table .= '<tr>';
    $table .= '<th>' . $i . '</th>';
    for ($j = 0; $j < 26; $j++) {
        $table .= '<td>' . randomCharacter() . '</td>';
    }
    $table .= '</tr>';
}

$table .= '</table>';

echo json_encode(['table' => $table]);
