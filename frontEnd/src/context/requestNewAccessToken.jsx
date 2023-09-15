
export const requestNewAccessToken =async (refreshToken)=>{
    try {
        const url='http://localhost:1234/api/auth/refresh-token'
        const response=await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken })
        })
        if(response.ok){
            const result=await response.json()           
            return result.accessToken
        }
    } catch (error) {
        throw new Error("Unable to refresh access token.");
    }

}