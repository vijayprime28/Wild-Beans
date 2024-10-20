import mongoose, { Schema } from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

const User = mongoose.models.User ?? mongoose.model('User', userSchema);


const orderSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    orderId: String,
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product
            count: { type: Number, required: true, default: 1 } // Quantity of each product
        }
    ],
    price: Number
}, { timestamps: true });

const Order = mongoose.models.Order ?? mongoose.model('Order', orderSchema);


const productSchema = new mongoose.Schema({
    name: String,
    displayName: String,
    type: String,
    price: Number,
    description: String,
    image: String
});

const Product = mongoose.models.Product ?? mongoose.model('Product', productSchema);


const sessionSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        expires_at: {
            type: Date,
            required: true
        }
    },
    { _id: false }
)

const Session = mongoose.models.Session ?? mongoose.model(
    "Session",
    sessionSchema
);

const adapter = new MongodbAdapter(
    mongoose.connection.collection("sessions"),
    mongoose.connection.collection("users")
);

export { User, Order, Product, Session, adapter }


