import { Router } from "express"
//import CartManager from "../dao/managers/fsmanagers/CartManager.js"
import CartManager from "../dao/managers/mongomanagers/mongoCartManager.js"
import __dirname from "../utils.js"

const cartsRouter = Router()
//const cartManager = new CartManager(__dirname + '/dao/managers/fsmanagers/data/carts.json')
const cartManager = new CartManager()

cartsRouter.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getCarts()

        res.json(cart)
    } catch (error) {
        throw error
    }

})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        // if (isNaN(cid)) {
        //     return res.status(400).send({ error: 'El id no es un número' })
        // }
        const cart = await cartManager.getCartById(cid)

        if (!cart) {
            return res.status(404).send({ error: `No se encontró ningún carrito con el id ${cid}.` })
        }

        res.json(cart)
    }
    catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener el carrito', message: error.message })
    }
})

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json({ message: `Carrito creado con id: ${newCart._id}` })
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al crear el carrito', message: error.message })
    }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        // if (isNaN(cid) || isNaN(pid)) {
        //     return res.status(400).json({ error: 'El id no es un número' })
        // }

        await cartManager.addProductToCart(cid, pid)

        // if (addToCart === null) {
        //     return res.status(404).send({ error: `No se encontró ningún carrito con el id ${cid}.` })
        // }

        // if (addToCart === false) {
        //     return res.status(404).send({ error: `No se encontró ningún producto con el id ${pid}.` })
        // }

        res.json({ message: `Se agregó el producto ${pid} al carrito ${cid}` })
    }
    catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito', message: error.message })

    }
})

export default cartsRouter