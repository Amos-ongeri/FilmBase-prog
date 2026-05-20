// const serverUrl = import.meta.env.VITE_SERVER_URL;
const serverUrl = 'http://localhost:5000'

const configsMap = new Map();

export const getConfigs = async () => {
    let configurations;
    try{
        if(configsMap.has("configs")){
            configurations = configsMap.get("configs")
        } else {
            const res = await fetch(`${serverUrl}/api/configurations`);
            const configs = await res.json();

            configsMap.set("configs", configs);

            configurations = configs;
        }
    } catch(e) {
        console.log("ERROR", e.message);
    }

    return configurations;
}