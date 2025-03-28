import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data');
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Datos desde PostgreSQL</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.nombre}</li> // Cambia 'id' y 'nombre' según tu tabla
                ))}
            </ul>
        </div>
    );
}

export default App;