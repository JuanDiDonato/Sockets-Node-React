//React
import React, {useEffect, useState} from 'react';
//Spcket IO
import io from 'socket.io-client';
let socket;

export default function Home(){

    const [username, setUsername] = useState()
    const [isJoin, setIsJoin] = useState(false)
    const [recived, setRecived] = useState([])


    useEffect(() => {
        socket = io()
        socket.on('pong', message => {console.log(message);})
        socket.on('push_message', (message) =>{
            setRecived(recived => [...recived, message])

        })
        socket.on('push_array', (array) =>{
            setRecived(array)

        })
    
        
    }, [])

    const SaveName = (e) => {
        e.preventDefault()
        const Name = document.getElementById('username').value
        setUsername(Name)
        alert('¡Nombre guardado!')
        document.getElementById('username').value = ''
    }
    const Join = () => {
        socket.emit('join', username)
        socket.on('welcome', (message) => {
            console.log(message);
        })
        setIsJoin(true)
    }   

    const Send = (e) => {
        e.preventDefault()
        const message = document.getElementById('message').value
        socket.emit('message', message)
        document.getElementById('message').value = ''
    }

    const borrar = (i) => {
        recived.splice(i,1)
        socket.emit('allMessages', recived)
        console.log(recived);        
    }
    
    return (
        <div>
            <h2>¡Bienvenido al chat con Socket.IO!</h2>
            <div>
                <input type="text" id="username" placeholder="username" />
                <button type="submit" onClick={SaveName}>Guardar nombre</button>
            </div>
            <div>
                <h2>Nombre actual: {username}</h2>
            </div>
            <div>
                <button type="submit" onClick={Join}>¡ENTRAR A UNA SALA!</button>
                <button type="submit" >¡CREAR UNA SALA!</button>
            </div>
            <div>
                {isJoin ? 
                <div>
                    <input type="text" id="message" placeholder="Escribi un mensaje aca" />
                    <button type="submit" onClick={Send}>Enviar</button>
                </div> : null}
                <div>
                    {recived.map(msj => {
                        return(
                            <div key={msj} style={{display: 'inline'}}>
                                <h3>{msj}</h3>
                                <button type="submit" onClick={() => borrar(recived.indexOf(msj))}>borrar</button>
                            </div>
                            
                            
                        )
                    })}
                </div>
            </div>

        </div>
    )
}



