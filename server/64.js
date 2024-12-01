import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// Получение пути к текущей директории в ES-модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Путь к исходному JSON-файлу
const jsonFilePath = path.join(__dirname, 'images.json');
// Путь к файлу для сохранения Base64-строки
const base64FilePath = path.join(__dirname, 'images_base64.txt');

// Функция для кодирования содержимого файла в Base64
async function encodeJsonToBase64() {
    try {
        // Чтение содержимого JSON-файла
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');

        // Кодирование строки в Base64
        const base64Encoded = Buffer.from(jsonData).toString('base64');

        // Сохранение закодированного содержимого в новый файл
        fs.writeFileSync(base64FilePath, base64Encoded);
        console.log('JSON-файл успешно закодирован в Base64 и сохранен в:', base64FilePath);
    } catch (err) {
        console.error('Ошибка при кодировании JSON в Base64:', err);
    }
}

encodeJsonToBase64();
