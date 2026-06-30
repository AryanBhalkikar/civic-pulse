import axios from "axios";
import { getApiUrl } from '../../config/api';

async function fetchData(setIssuesList, setLoading){
    try{
        const response = await axios.get(
            getApiUrl('/api/issuesDisplay'),
            { withCredentials: true }
        );
        setIssuesList(response.data);
    }
    catch(err){
        alert(err.response?.data?.message || "Fetch failed");
    }
    finally{
        setLoading(false);
    }
}

export default fetchData;