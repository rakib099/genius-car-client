import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, service, serviceName, price, customer, phone, status } = order;
    const [orderService, setOrderService] = useState({});

    // loading particular service data
    useEffect(() => {
        fetch(`https://genius-car-server-liard-xi.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
            .catch(err => console.error(err));
    }, [service]);

    

    return (
        <tr>
            <th>
                <label>
                <button onClick={() => handleDelete(_id)} className="btn btn-ghost">X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                orderService?.img &&
                                <img src={orderService.img} alt="Service-Img" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>Indigo</td>
            <th>
                <button 
                onClick={() => handleStatusUpdate(_id)} 
                className="btn btn-ghost btn-xs">{status ? status : "pending"}</button>
            </th>
        </tr>
    );
};

export default OrderRow;