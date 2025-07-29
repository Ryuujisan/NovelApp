import LastTopicLabel from "../componets/LastTopicLabel.jsx";

const Homepage = () => {
    return (
        <div className={``}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend className="fieldset-legend">Last topic</legend>


                <ul className="fieldset-list justify-between gap-4">
                    <LastTopicLabel topic={'Lorem ipsum dolor sit.'} author={`Izumi`}/>
                    <LastTopicLabel topic={'Lorem ipsum dolor sit.'} author={`Izumi`}/>
                    <LastTopicLabel topic={'Lorem ipsum dolor sit.'} author={`Izumi`}/>
                    <LastTopicLabel topic={'Lorem ipsum dolor sit.'} author={`Izumi`}/>
                 </ul>
            </fieldset>
        </div>

    )
};

export default Homepage;