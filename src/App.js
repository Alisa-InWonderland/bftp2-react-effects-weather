import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
    const WEATHER_API = "https://weatherdbi.herokuapp.com/data/weather/";

    // const [count, setCount] = useState(0);
    // const [drawing, setDrawing] = useState("");
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [cityName, setCityName] = useState("barcelona");

    // function updateDrawing() {
    //     if (count === 0) {
    //         setDrawing("✨");
    //     } else {
    //         setDrawing("⭐️".repeat(count));
    //     }
    // }

    function updateWeatherData( data ) {
        const temperature = data.currentConditions.temp.c
        const iconURL = data.currentConditions.iconURL
        const dia = data.currentConditions.dayhour
        setTitle(`Buenos días, hoy es ${dia}, tenemos ${temperature} grados en ${data.region}`)
        setIcon(iconURL)
    }

    const getDataByCity = () => {
        fetch(WEATHER_API + cityName) // saco el JSON de datos
            .then(r => r.json()) //
            .then( updateWeatherData )
    }

    useEffect( () => {
        getDataByCity();
            //.then(removeCity)
    }, [cityName]);

    // useEffect( () => {setInterval(function() {
    //     getDataByCity();
    // }, 60000);
    // }, []);



    // useEffect( () => console.log(
    //     "Hola, llevamos "+ count),
    //     [count]);
    //
    // useEffect(updateDrawing, [count]);
    //
    // function increaseCounter() {
    //     setCount(count + 1);
    // }
    // onChange={(e) => setCityName(e.target.value) }

    let input = document.querySelector('.input');

    const changeCity = () => {
        setCityName(input.value)
        input.value = "";
    }

    const onEnterPressed = (event) => {
        if (event.key === 'Enter') {
            changeCity();
        }
    }

    // const removeCity = () => {
    //         input.value = "";
    //     }


    return (
        <div onKeyDown={onEnterPressed} className="App">
            <h2>{ title }</h2>
            <img src={icon} alt="weather icon"/> <br/>
            <input className='input' type={"text"}  />
            {/*<p> {`La cuenta es ${count}`}</p>*/}
            {/*<p> { drawing } </p>*/}
            {/*<button onClick={increaseCounter}>Incrementar</button>*/}
            <button onClick={changeCity}>Cambiar la ciudad</button>
        </div>
    );
}

export default App;
