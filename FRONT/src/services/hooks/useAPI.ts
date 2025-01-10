import axios from 'axios';

const useApi = () => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
    };

    // Création d'une instance Axios
    const api = axios.create({
        baseURL: import.meta.env.VITE_APP_PROD,
        
        headers
    });

    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        // on pourrait ajouter des éléments dans le header
        // ajouter dans le header le token (Authorization)
        //
        return config;
    });

    // tout de suite la reponse de la requète
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);

            if (error.response && error.response.status === 401) {
                // Probleme d'authentification
            }

            if (error.response && error.response.status === 404) {
                // Probleme de resources indisponible
                console.log("ressource indispo");
            }
            return Promise.reject(error);
        }
    );

    return api;
}

export default useApi
