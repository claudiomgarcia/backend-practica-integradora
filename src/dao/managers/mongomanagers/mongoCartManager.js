import cartsModel from '../../models/carts.model.js'

export default class CartManager {

    async createCart() {
        try {
            const cartData = {}
            return await cartsModel.create(cartData)
        } catch (error) {
            throw error
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid)
            const existingProduct = cart.products.some((product) => product.product.toString() === pid)

            if (existingProduct) {
                const index = cart.products.findIndex(product => product.product.toString() === pid)
                cart.products[index].quantity += 1
                await cart.save()
            }
            else {
                cart.products.push({ product: pid })
                await cart.save()
            }
        } catch (error) {
            throw error
        }
    }

    async getCarts() {
        try {
            return await cartsModel.find()
        } catch (error) {
            throw error
        }
    }


    async getCartById(cid) {
        try {
            return await cartsModel.findById(cid).populate('products.product')
        } catch (error) {
            throw error
        }
    }

}