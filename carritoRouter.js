const { Router } = require('express')
const Contenedor = require('./Contenedor')

const contenedorProductos = new Contenedor('productos.txt')
const contenedorCarrito = new Contenedor('carritos.txt')

let obj =
{
    id: 1,
    timestamp: Date.now(),
    productos: []
}


    ; (async () => {

        await contenedorCarrito.save(obj);

    })();

const carritoRouter = Router()



carritoRouter.post('/', async (req, res) => {
    return res.json(await contenedorCarrito.save(req.body))
})

carritoRouter.delete('/:id', async (req, res) => {
    return res.json(await contenedorCarrito.deleteById(+req.params.id))
})

carritoRouter.get('/:id/productos', async (req, res) => {
    let carrito = await contenedorCarrito.getByid(+req.params.id)
    return res.json(carrito.productos)
})

carritoRouter.post('/:id/productos', async (req, res) => {
    let id = +req.body.id
    let producto = {
        productos: await contenedorProductos.getByid(id)
    }
    contenedorCarrito.updateProduct(producto, +req.params.id)

    return res.status(201).json({})
})

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    let carrito = await contenedorCarrito.getByid(+req.params.id)

    let index = carrito.productos.findIndex(e => e.id === +req.params.id_prod)
    carrito.productos.splice(index, 1)
    contenedorCarrito.updateCarrito(carrito, +req.params.id)

    return res.json()
})



module.exports = carritoRouter
