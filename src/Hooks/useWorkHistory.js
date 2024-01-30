import axios from "axios"


export const useWorkHistory = () => {
    const BASE_URL =
        import.meta.env.VITE_BASE_URL;
    const LOCAL_URL =
        import.meta.env.VITE_LOCAL_URL;
    const token = localStorage.getItem("auth-token")
    const getRoomHistory = async (roomId) => {
        try {
            const res = await axios.get(`${LOCAL_URL}work-history/rooms?roomId=${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Room History",res.data.data);
            return res.data.data;
        } catch (error) {
            console.error('Error fetching room history:', error);
            // Handle the error based on your application's needs
            // For example, you might want to return an empty array or null, or throw the error further
            return null; // or throw error;
        }
    };
    
    const getInspectorHistory = async (inspectorId) => {
        try {
            const res = await axios.get(`${LOCAL_URL}work-history/inspector?inspectorId=${inspectorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
           
            return res.data.data;
        } catch (error) {
            console.error('Error fetching inspector history:', error);
            return null; // or throw error;
        }
    };
    

    const getCleanerHistory = async (cleanerId) => {
        try {
            const res = await axios.get(`${LOCAL_URL}work-history/cleaner?cleanerId=${cleanerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //  console.log("Cleaner history", res.data.data);
            return res.data.data;
        } catch (error) {
            console.error('Error fetching cleaner history:', error);
            return null; // or throw error;
        }
    };
    
    return {
        getCleanerHistory,
        getInspectorHistory,
        getRoomHistory,
    }
}