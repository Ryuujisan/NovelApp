import {useParams} from "react-router";

const Read = () => {

    const readingList = useParams();
    console.log("Series read", readingList);

    return (
        <div className={``}>Read</div>
    )
};

export default Read;