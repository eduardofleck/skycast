import axios from "axios";

const getCityByGeolocalization = () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    axios
      .get(process.env.GOOGLE_GEOCODE_API, {
        params: {
          latlng: `${position.coords.latitude}, ${position.coords.longitude}`,
          key: process.env.GOOGLE_KEY,
        },
      })
      .then(
        (response) => {
          console.log(response);

          let city;

          if (
            (response != null) &
            (response.data != null) &
            (response.data.results != null)
          ) {
            response.data.results.forEach((result) => {
              if (!city) {
                city = (result.address_components || []).find((address) =>
                  (address.types || []).includes("administrative_area_level_2")
                );
              }
            });
          }

          console.log(city.long_name);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  });
};

export default getCityByGeolocalization;
