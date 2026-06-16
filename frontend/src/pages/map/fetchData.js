import axios from "axios";

async function fetchData(setIssuesList, setLoading){
    try{
        const response = await axios.get(
            "http://localhost:5001/api/issuesDisplay",
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