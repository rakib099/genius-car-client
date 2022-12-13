import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders/?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
            .catch(err => console.error(err));
    }, [user?.email]);

    // deleting an order
    const handleDelete = (_id) => {
        const proceed = window.confirm("Are you sure you want to cancel this order?");
        if (proceed) {
            fetch(`http://localhost:5000/orders/${_id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("Order successfully deleted");
                    const remaining = orders.filter(order => order._id !== _id);
                    setOrders(remaining);
                }
            })
            .catch(err => console.error(err));
        }
        else {
            console.log("order deletion aborted");
        }
    }

    return (
        <div>
            <h2 className='text-5xl'>You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow 
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                            />)
                        }
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default Orders;