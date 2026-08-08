const APIController = () => {
  const apiKey = 'EKS79RHNPFCJU4NX8PUVYBEJP';

  async function fetchApiData(location) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`
      );

      if (response.status >= 400) {
        alert('location not found');
        return;
      }
      const data = await response.json();
      return processAPIData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function processAPIData(data) {
    const processedData = Object.assign(
      {},
      {
        address: data.address,
        temp: data.currentConditions.temp,
        feelsLike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        uvindex: data.currentConditions.uvindex,
        precip: data.currentConditions.precip,
        wind: data.currentConditions.windgust,
        condition: data.currentConditions.conditions,
        description: data.description,
        icon: data.currentConditions.icon,
      }
    );
    console.log(processedData);
  }

  return {
    fetchApiData,
  };
};

const apiController = APIController();

export { apiController };
