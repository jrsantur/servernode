  exports.index = function (req, res, next) {

  Producto.find(getProducts)

  // NOTA: Creo que es bueno usar verbos en inglés para las funciones,
  //       por lo cómodo que son en estos casos (get, got; find, found)
  function getProducts (err, productos) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.render('index', {title: 'Lista de Productos', productos: productos})
  }
}
//POST 
//agregar un producto 

exports.create = function (req, res, next) {
  if (req.method === 'GET') {
    return res.render('show_edit', {title: 'Nuevo Producto', producto: {}})
  } else if (req.method === 'POST') {
    // Obtenemos las variables y las validamos
    var nombre      = req.body.nombre       || ''
    var descripcion = req.body.descripcion  || ''
    var precio      = req.body.precio       || ''

    // Validemos que nombre o descripcion no vengan vacíos
    if ((nombre=== '') || (descripcion === '')) {
      console.log('ERROR: Campos vacios')
      return res.send('Hay campos vacíos, revisar')
    }

    // Validemos que el precio sea número
    if (isNaN(precio)) {
      console.log('ERROR: Precio no es número')
      return res.send('Precio no es un número !!!!!')
    }

    // Creamos el documento y lo guardamos
    var producto = new Producto({
        nombre        : nombre
      , descripcion   : descripcion
      , precio        : precio
    })

    producto.save(onSaved)

    function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/')
    }
  }  
}


