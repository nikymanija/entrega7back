const { Router } = require('express');
const res = require('express/lib/response');
const Contenedor = require('./Contenedor')


let cont1 = new Contenedor('productos.txt')


let obj = [
    {
        id: 1,
        timestamp: Date.now(),
        nombre: 'Producto1',
        descripcion: 'Este es el producto1',
        codigo: 142343,
        url: 'http:localhost:producto',
        precio: 21,
        stock: 7
    },
    {
        id: 2,
        timestamp: Date.now(),
        nombre: 'Producto2',
        descripcion: 'Este es el producto1',
        codigo: 345656,
        url: 'http:localhost:producto',
        precio: 26,
        stock: 5
    },
    {
        id: 3,
        timestamp: Date.now(),
        nombre: 'Producto1',
        descripcion: 'Este es el producto3',
        codigo: 765389,
        url: 'http:localhost:producto',
        precio: 56,
        stock: 2
    }
]

    ; (async () => {
        for (let i = 0; i < 3; i++) {
            await cont1.save(obj[i]);
        }
    })();


const productosRouter = Router()

let admin = true

const middlewareAdmin = (req, res, next) => {
    if (admin) {
        return next()
    }
    return res.json({ mensaje: "Usuario no permitido" })
}

productosRouter.get('/', async (req, res) => {

    return res.json(await cont1.getAll())
})

productosRouter.get('/:id', async (req, res) => {
    return res.json(await cont1.getByid(+req.params.id))
})

productosRouter.post('', middlewareAdmin, async (req, res) => {
    await cont1.save(req.body)
    return res.status(201).json(await cont1.getAll())
})

productosRouter.put('/:id', middlewareAdmin, async (req, res) => {

    return res.json(await cont1.updateProduct(req.body, +req.params.id))
})

productosRouter.delete('/:id', middlewareAdmin, async (req, res) => {
    return res.json(await cont1.deleteById(+req.params.id))
})


module.exports = productosRouter



