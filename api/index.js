//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const colors = require('colors');
const {getTypes} = require('./src/routes/functions');
const {Type} = require('./src/db');
const {PORT} = process.env;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, async() => {
    //cargo los types a la base de datos apenas inicio el servidor
    let types = await getTypes();
    await Type.bulkCreate(types);
    console.log('TYPES CARGADOS AL INICIAR MI SERVIDOR DESDE ARCHIVO: api/index'.magenta);
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
