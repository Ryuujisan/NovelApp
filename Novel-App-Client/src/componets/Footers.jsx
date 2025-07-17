const Footers = () => {
    const data = new Date();
    return (
        <div className={`items-center justify-center w-auto h-auto m-4 p-4 content-center text-center`}>
            <hr className={`color-gray-100`}/>
            <span className={`block`}>Term of Service | About us | Contact us</span>
            <span className={`block`}>{data.getFullYear()}©Virtual Novel</span>
        </div>
    )
};

export default Footers;