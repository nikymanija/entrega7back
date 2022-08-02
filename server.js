const express = require('express')
const app = express()
const productosRouter = require('./productosRouter')
const carritoRouter = require('./carritoRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)


app.use((err, req, res, next) => {
    return res.status(500).json({
        error: 'Error, no se encuentra el producto'
    })
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando por puerto ${PORT}`)
})

server.on('error', error => { console.log(`Error en servidor: ${error}`) })