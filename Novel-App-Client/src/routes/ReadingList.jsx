import {useParams} from "react-router";

const ReadingList = () => {
    const readingList = useParams();
    console.log("readingList", readingList);
    return (
        <div className={``}>ReadingList</div>
    )
};

export default ReadingList;