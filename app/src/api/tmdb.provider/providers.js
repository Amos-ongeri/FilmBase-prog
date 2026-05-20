const serverUrl = import.meta.env.VITE_SERVER_URL;

const providersMap = new Map();

export const getProviders = async (media_type, tmdb_id) => {
  try {
    const key = `${media_type}-${tmdb_id}`;

    if (providersMap.has(key)) {
      return providersMap.get(key);
    }

    const res = await fetch(
      `${serverUrl}/api/${media_type}/${tmdb_id}/providers`
    );

    const data = await res.json();

    providersMap.set(key, data);

    return data;
  } catch (e) {
    console.log("ERROR", e.message);
    return null;
  }
};