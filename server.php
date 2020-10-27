<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
if ($uri !== '/' && file_exists(__DIR__.'/public'.$uri)) {
    return false;
}

require_once __DIR__.'/public/index.php';




/*
http://becasbeneficios.ugm.cl/service.php?acceso_alumno=189567391 

http://becasbeneficios.ugm.cl/service.php?informacion_basica=189567391 

http://becasbeneficios.ugm.cl/service.php?carreras_programas=189567391  

controlador modelo y migration
php artisan make:model ModelName -m -cr 

https://www.itechempires.com/2019/09/complete-guide-of-using-laravel-6-eloquent-subquery-enhancements/

php artisan migrate:refresh --seed

php artisan make:seeder MoviesTableSeeder

composer dump-autoload

https://medium.com/@vchaurasia95/basic-operations-in-bigchaindb-using-js-eb530216eaa7

https://www.itsolutionstuff.com/post/react-form-validation-tutorial-exampleexample.html


https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

axios.all([
  axios.get('https://api.github.com/users/mapbox'),
  axios.get('https://api.github.com/users/phantomjs')
])
.then(responseArr => {
  //this will be executed only when all requests are complete
  console.log('Date created: ', responseArr[0].data.created_at);
  console.log('Date created: ', responseArr[1].data.created_at);
});



https://colorhunt.co/

https://www.tailorbrands.com/es/

https://color.adobe.com/es/explore

//https://github.com/lijujohn13/react-laravel-auth/tree/master/resources/assets/js



https://tutorials.bigchaindb.com/crab/create
*/

