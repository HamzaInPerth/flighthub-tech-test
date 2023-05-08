## Back (Require >= PHP 7.2.5)
cd back
php composer.phar update
php -S localhost:1111 -t www

## Front (Require Node >= 16 or consider using NVM)
cd front
npm install
npm start