import fs from 'fs';
import path from 'path';

// Функция для кодирования файла в Base64
async function encodeFileToBase64(filePath) {
    try {
        // Чтение файла
        const fileBuffer = await fs.promises.readFile(filePath);
        // Кодирование в Base64
        const base64Data = fileBuffer.toString('base64');
        return base64Data;
    } catch (error) {
        console.error('Ошибка при кодировании файла:', error.message);
        return null;
    }
}

// Укажите путь к файлу
const filePath = path.resolve('template.frx');

// Кодируем файл
const base64Encoded = await encodeFileToBase64(filePath);

if (base64Encoded) {
    console.log('Файл закодирован в Base64:');
    console.log(base64Encoded);
    // Если нужно сохранить результат в файл
    await fs.promises.writeFile('encodedFile.txt', base64Encoded);
    console.log('Результат сохранен в "encodedFile.txt"');
} else {
    console.log('Не удалось закодировать файл.');
}
