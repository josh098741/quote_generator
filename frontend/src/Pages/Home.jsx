import React,{ useState } from 'react'
import axios from 'axios'

function Home(){

    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchQuote = async () => {
        try{
            setLoading(true)
            const response = await axios.get('https://dummyjson.com/quotes/random')
            const data = response.data
            setAuthor(data.author)
            setContent(data.quote)
            
        }catch(error){
            console.error("Error in fetching Quote",error)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen ">
            <div className="flex justify-center items-center border border-slate-500 h-screen">
                <div className="border m-10 w-[600px] border-slate-900 rounded-xl h-[500px]">
                    <div>
                        <h1 className="text-3xl text-center">Quotes Generator</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center h-[350px] p-6">
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
                            </div>
                        ) : content ? (
                            <div className="text-center space-y-4">
                                <p className="text-xl italic">"{content}"</p>
                                <p className="text-lg font-semibold">- {author}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500">Click the button to generate a quote</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button 
                            onClick={fetchQuote} 
                            disabled={loading} 
                            className="border border-slate-800 px-6 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-300"
                        >
                            {loading ? "Loading..." : "Generate Quote"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home