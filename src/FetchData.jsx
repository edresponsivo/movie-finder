const apiConfig = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    apiKey: import.meta.env.VITE_API_KEY,
  };

const FetchData = () => {
    const { baseUrl, apiKey } = apiConfig;
  return (
    <div>FetchData</div>
  )
}
export default FetchData
