export const API_URL = process.env.API_URL || "http://localhost:8000/api";

export const fetcher = async (url: string, token?: string) => {
    const res = await fetch(`${API_URL}${url}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des données");
    return res.json();
};