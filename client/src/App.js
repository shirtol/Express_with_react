import axios from "axios";
import { useState } from "react";

function App() {
    const [term, setTerm] = useState("");
    const [temp, setTemp] = useState("");

    const onValueChange = ({ target: { value } }) => {
        setTerm(value);
    };

    const getCityWeather = async () => {
        const data = await axios.get(
            `http://localhost:5000/weather/?city=${term}`
        );
        console.log(data.data.current.temp_c);
        setTemp(data.data.current.temp_c);
    };

    return (
        <div className="App">
            <input
                value={term}
                onChange={onValueChange}
                placeholder="Enter city"
            ></input>
            <button onClick={getCityWeather}>Get Weather!</button>
            <h1>{`Temp: ${temp}`}</h1>
        </div>
    );
}

export default App;
