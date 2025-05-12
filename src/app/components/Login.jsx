"use client"

const Login = () => {
    return (
        <section className="bg-[#800000]">
            <div className="flex flex-row h-[40rem] pt-20">
            <div className="basis-[60%] border-t-6 border-b-6 border-r-6 border-white pl-30 pt-50 pb-50 pr-50 flex flex-row justify-between">
                <div className="text-white">
                    <p className="text-4xl font-[50]">KURATOR</p>
                    <p className="text-4xl font-[700]">LOGIN</p >
                </div>
                <div>
                    <form className="flex flex-col gap-4 w-[250px]">
                        <input 
                            type="text" 
                            placeholder="BRUGERNAVN..." 
                            className="bg-white text-gray-600 px-4 py-2 placeholder-gray-400 outline-none"/>
                        <input 
                            type="password" 
                            placeholder="KODEORD..." 
                            className="bg-white text-gray-600 px-4 py-2 placeholder-gray-400 outline-none"/>
                        <button 
                            type="submit" 
                            className="relative border border-white text-white px-4 py-5 w-40 h-14 hover:bg-white hover:text-[#800000]">
                            <span className="absolute bottom-2 left-2 text-left">Log ind</span>
                        </button>
                    </form>
                </div>
            </div>
            <div className="basis-[40%]"></div>
            </div>
            <div className="w-full h-[200px]"></div>
        </section>
    )
}

export default Login;