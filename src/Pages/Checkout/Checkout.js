import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const {user} = useContext(AuthContext);

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,  /* (shortcut) As same name varible */
            customer: name,
            email, 
            phone,
            message
        }
        
        // validation
        if (phone.length < 11) {
            toast.error("Please provide a valid phone number");
            return;
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.acknowledged) {
                alert("Your order has been placed. Thank you!");
                form.reset();
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <form onSubmit={handlePlaceOrder} className='bg-base-200 p-5'>
            <h2 className='text-4xl'>You are about to order: {title}</h2>
            <h4 className='text-3xl'>Price: ${price}</h4>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input name='firstName' type="text" placeholder="First Name" className="input w-full" required />
                <input name='lastName' type="text" placeholder="Last Name" className="input w-full" required />
                <input name='phone' type="number" placeholder="Your Phone" className="input w-full" required />
                <input name='email' type="text" placeholder="Your Email" className="input w-full" defaultValue={user?.email} readOnly />
            </div>
            <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message"></textarea>
            <input className='btn' type="submit" value="Place Your Order" />
        </form>
    );
};

export default Checkout;