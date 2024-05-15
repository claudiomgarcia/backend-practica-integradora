//import ProductManager from "../dao/managers/fsmanagers/ProductManager.js"
import ProductManager from '../dao/managers/mongomanagers/mongoProductManager.js'
import __dirname from "../utils.js"

//const productManager = new ProductManager(__dirname + '/dao/managers/fsmanagers/data/products.json')
const productManager = new ProductManager()

const socketProducts = (socketServer) => {
    socketServer.on('connection', async (socket) => {
        console.log('Nuevo cliente conectado')

        const sendUpdatedProductList = async () => {
            const productList = await productManager.getProducts()
            socketServer.emit('sendProducts', productList)
        }
        sendUpdatedProductList()

        socket.on('addProduct', async (obj) => {
            try {
                await productManager.addProduct(obj)
                sendUpdatedProductList()
            } catch (error) {
                console.error('Error al agregar el producto:', error)
            }
        })

        socket.on('deleteProduct', async (id) => {
            try {
                await productManager.deleteProduct(id)
                sendUpdatedProductList()
            } catch (error) {
                console.error('Error al eliminar el producto:', error)
            }
        })

        socket.on('disconnect', () => {
            console.log("Cliente desconectado")
        })
    })
}

export default socketProducts