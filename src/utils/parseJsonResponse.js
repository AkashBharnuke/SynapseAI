const parseJsonResponse = (response) => {
    try {
        const cleaned = response.replace(/```json/g, "").replace(/```/g, "").trim();

        return {
            success: true, 
            data: JSON.parse(cleaned)
        }

    } catch (error) {
        return {
            success: false,
            error: "Failed to Parse judge response",
            raw: response
        };
    }
}


export { parseJsonResponse };