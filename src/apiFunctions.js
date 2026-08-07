const ApiController = () => {
  const apiKey = 'EKS79RHNPFCJU4NX8PUVYBEJP';

  async function fetchApiData() {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/rawalpindi?key=${apiKey}`
    );
    const data = await response.json();
    processAPIData(data);
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

export { ApiController };
