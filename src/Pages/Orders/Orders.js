import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logOut, loading, setLoading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://genius-car-server-liard-xi.vercel.app/orders/?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                // if unauthorized or invalid token or expired token
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                // console.log('received', data);
                setOrders(data);
            })
            .catch(err => console.error(err));
    }, [user?.email, logOut, setLoading]);

    
    // deleting an order
    const handleDelete = (_id) => {
        const proceed = window.confirm("Are you sure you want to cancel this order?");
        if (proceed) {
            fetch(`https://genius-car-server-liard-xi.vercel.app/orders/${_id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
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

    const handleStatusUpdate = (_id) => {
        fetch(`https://genius-car-server-liard-xi.vercel.app/orders/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: "Approved" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // updating the approved one in the UI
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== _id);
                    const approving = orders.find(odr => odr._id === _id);
                    approving.status = "Approved";//status property add
                    const newOrders = [...remaining, approving];
                    setOrders(newOrders);
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h2 className='text-5xl'>You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
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
                                handleStatusUpdate={handleStatusUpdate}
                            />)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;