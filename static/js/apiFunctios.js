 export const loginuser = async (loginValues) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/companies/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json','Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
            },
            body: JSON.stringify({
                loginValues
            })
        })
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'something went wrong');
        }
        return
    } catch (err) {
        console.error(err);
    }


}