import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    default: 1
                }

            }
        ],
        default: []
    }
})
cartsSchema.pre('find', function (next) {
    this.populate('products._id');
    next()
})

export default mongoose.model('carts', cartsSchema)
