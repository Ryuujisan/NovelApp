import {Link} from "react-router";

const LastTopicLabel = ({topic, author}) => {
    return (
        <li className={"even:bg-base-200 odd:bg-base-300 mt-1 mb-1 text-[18px] flex justify-between p-1"}><Link className={"className=btn btn-ghost"}><span>{topic}</span></Link><span>{author}</span></li>
    )
};

export default LastTopicLabel;