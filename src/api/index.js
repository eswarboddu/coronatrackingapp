import axios from "axios";
const url = 'https://covid19.mathdro.id/api';
const dailyurl = "https://covid19.mathdro.id/api/daily";
const countriesurl = "https://covid19.mathdro.id/api/countries";

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        const selectcountry = "https://covid19.mathdro.id/api/countries/" + country;
        changeableUrl = selectcountry;
    }

    // else if (global){
    //     changeableUrl = url;
    // }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        const modifiedData = { confirmed, recovered, deaths, lastUpdate }
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(dailyurl);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(countriesurl);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}
