import axios from "axios";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/weather", async (req, res) => {
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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
