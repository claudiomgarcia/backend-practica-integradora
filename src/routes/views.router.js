import { Router } from "express"
//import ProductManager from '../dao/managers/fsmanagers/ProductManager.js'
import ProductManager from '../dao/managers/mongomanagers/mongoProductManager.js'
import __dirname from '../utils.js'

const viewsRouter = Router()
//const productManager = new ProductManager(__dirname + '/dao/managers/fsmanagers/data/products.json')

const productManager = new ProductManager()

viewsRouter.get('/', async (req, res) => {
    try {
        const readProducts = await productManager.getProducts()
        res.render('home', { readProducts, title: "Todos los productos" })
    } catch (error) {
        
    }

})

viewsRouter.get('/realtimeproducts', (req, res) => {
    try {
        res.render('realTimeProducts', { title: "Productos en tiempo real" })
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los productos.', message: error.message })
    }
    
})

export default viewsRouter