

const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        return res.status(200).json({
            success: true,
            message: "Chat endpoint working.",
            prompt
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }   
}



export {
    generateResponse
}