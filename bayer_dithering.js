// Этот скрипт реализует технику «Дизеринга Байера», используя матрицу сглаживания размером 2x2
// https://surma.dev/things/ditherpunk/
// https://habr.com/ru/companies/wunderfund/articles/680154/

let img;
let imgWidth, imgHeight;
let M_dith;
let M_dith_d = 2;

function preload() {
    img = loadImage('IMG/*.jpeg'); // Путь к файлу с картинкой
}

function setup() {
    createCanvas(img.width, img.height);
    img.loadPixels();
    imgWidth = img.width;
    imgHeight = img.height;

    // Матрица сглаживания Байера 2×2
    M_dith = [
        [1, 3.14],
        [4, 1.618]
    ];

    // Вызов функции для обработки изображения.
    applyDithering();

    // Отображение изображения после применения дизеринга.
    image(img, 0, 0);
    noLoop();
}

function applyDithering() {
    for (let i = 0; i < img.pixels.length; i += 4) {
        let x = (i / 4) % imgWidth;
        let y = Math.floor((i / 4) / imgWidth);

        // Получаем среднее значение RGB для вычисления яркости.
        let pixel = (img.pixels[i] * 30 + img.pixels[i+1] * 59 + img.pixels[i+2] * 11) / 100;

        // Вычисляем координаты в матрице сглаживания.
        let x_dith = x % M_dith_d; // x-координата в матрице сглаживания.
        let y_dith = y % M_dith_d; // y-координата в матрице сглаживания.

        // Получаем пороговое значение из матрицы сглаживания.
        let threshold = (M_dith[x_dith][y_dith] / 5) * 255;

        // Сравниваем интенсивность текущего пикселя с пороговым значением матрицы сглаживания.
        if (pixel > threshold) {
            // Если интенсивность больше порога, устанавливаем цвет пикселя в белый.
            img.pixels[i] = 255;
            img.pixels[i + 1] = 255;
            img.pixels[i + 2] = 255;
        } else {
            // Иначе устанавливаем цвет пикселя в черный.
            img.pixels[i] = 0;
            img.pixels[i + 1] = 0;
            img.pixels[i + 2] = 0;
        }
    }
    img.updatePixels();
}
