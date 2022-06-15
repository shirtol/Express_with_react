import axios from "axios";
import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/weather", async (req, res) => {
    // const city = req.body.city;
    const { city } = req.query;
    console.log(city);
    console.log(process.env.RAPID_API_KEY);
    try {
        const { data } = await axios.get(
            "https://weatherapi-com.p.rapidapi.com/current.json",
            {
                params: { q: city },
                headers: {
                    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
                    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
                },
            }
        );

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

// const options = {
//     method: "GET",
//     url: "https://weatherapi-com.p.rapidapi.com/current.json",
//     params: { q: "Tel Aviv" },
//     headers: {
//         "X-RapidAPI-Key": "7d166d0b59msh05362e0ce57fe42p1224ebjsn746d1f9a890c",
//         "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
//     },
// };

// const { data } = await axios.get(
//     "https://api.openweathermap.org/data/2.5/onecall",
//     {
//         params: {
//             exclude: "hourly,daily,minutely,alerts",
//             appid: "0d0ec6f4de7c31163cc07a7996b97d70",
//             lat: 35,
//             lon: 139,
//         },
//     }
// );

// const { data } = await axios.request(options);
// console.log(data);
// res.status(200).json(data);

// const options = {
//     method: "GET",
//     url: "api.openweathermap.org/data/2.5/onecall",
//     params: {
//         exclude: "hourly,daily,minutely,alerts",
//         appid: "0d0ec6f4de7c31163cc07a7996b97d70",
//         lat: 35,
//         lon: 139,
//     },
// };
