import { Lucia, TimeSpan } from "lucia";
import mongoose, { model } from "mongoose";
import { User, Product, Order, Session, adapter } from "@/models/models";
import { cookies } from "next/headers";
import { hashPassword } from "./hash";
import { nanoid } from "nanoid";


mongoose.connect("mongodb+srv://admin:admin@cluster0.iuj4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


export async function createUser(email, username, password) {
    try {
        const emailCheck = await User.findOne({ email: email });
        if (emailCheck) {
            return ({ status: 'error', message: "An account with this email address already exists." });
        }

        const usernameCheck = await User.findOne({ username: username });
        if (usernameCheck) {
            return ({ status: 'error', message: "The username you have chosen is already taken." });
        }

        const hash = await hashPassword(password);

        const newUser = new User({
            email: email,
            username: username,
            password: hash
        });

        await newUser.save();
        return ({ status: 'success', message: "Success", newUser });
    }
    catch (e) {
        console.log(e);
        return ({ status: 'error' });
    }
}

export async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    }
    catch (e) {
        console.log(e);
        return ({ status: 'error' });
    }
}

export async function getUserById(id) {
    try {
        const user = await User.findById(id).populate({
            path: 'orders',
            populate: {
                path: 'items.productId',
                model: 'Product'
            }
        });
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            orders: user.orders
        };
    }
    catch (e) {
        console.log(e);
        return ({ status: 'error' });
    }
}


export async function getItems() {
    try {
        const items = await Product.find();
        return items;
    }
    catch (e) {
        console.log(e);
        return ({ status: 'error' });
    }
}

export async function newOrder(userId, items) {
    try {
        let price = 0;

        // Calculate the total price
        items.forEach(item => {
            price += item.price * item.count;
        });

        // Create the order
        const newOrder = new Order({
            userId: userId,
            orderId: nanoid(10),
            items: items.map((item) => ({
                productId: item._id,  // Reference to the product's ID
                count: item.count     // Quantity of the product
            })),
            price: price
        });

        // Save the order to the database
        await newOrder.save();

        const user = await User.findById(userId);
        user.orders = [...user.orders, newOrder._id];
        await user.save();

        return { status: "Success" };
    } catch (e) {
        console.log(e);
        return { status: 'error' };
    }
}



const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "d"), //cookie is deleted in client side in 2 days
    sessionCookie: {
        expires: false, //server side cookie is not deleted
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        },
    }
});

export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuth() {
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    if (!sessionCookie) {
        return {
            user: null,
            session: null
        };
    }

    const sessionId = sessionCookie.value;

    if (!sessionId) {
        return {
            user: null,
            session: null
        };
    }

    const result = await lucia.validateSession(sessionId);

    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id); //refresh session
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        else {
            const sessionCookie = lucia.createBlankSessionCookie(); // clear expired cookie
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch (e) {
        // console.log(e);
    }
    return result;
}

export async function destroySession() {
    const { session } = await verifyAuth();
    if (!session) {
        return {
            error: 'Unauthorized'
        }
    }

    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();// clear expired cookie
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}