import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [search, setSearch] = useState("");
    const searchRef = useRef();

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data));
    }, [isAsc, search]);

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }

    return (
        <div className='mb-32'>
            <div className='text-center mb-8'>
                <p className="text-2xl font-bold text-orange-600">
                    Services
                </p>
                <h1 className="my-5 text-5xl font-bold">
                    Our Service Area
                </h1>
                <p className='w-2/4 mx-auto'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='flex justify-between mb-3'>
                <div className='search-field'>
                    <input className='input input-sm input-bordered' ref={searchRef} type="text" />
                    <button className='btn btn-primary ml-2' onClick={handleSearch}>Search</button>
                </div>
                <div className='sort-field flex items-center gap-2'>
                    <label htmlFor="sort">Sort: </label>
                    <select id='sort'
                        className="select select-bordered w-50 max-w-xs" defaultValue="Ascending"
                        onChange={e => {
                            e.target.value === 'Ascending' ? setIsAsc(true) : setIsAsc(false)
                        }}>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>
                </div>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    />)
                }
            </div>
        </div>
    );
};

export default Services;