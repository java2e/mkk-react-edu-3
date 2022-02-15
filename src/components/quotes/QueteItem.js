import { Link } from "react-router-dom";

import classes from './QueteItem.module.css';

const QueteItem = (props) => {

    return(
        <li className={classes.item}>
            <figure>
                <blockquote>
                    <p> {props.text}</p>
                </blockquote>
                <figcaption>{props.author}</figcaption>
            </figure>
            <Link to={`/quotes/${props.id}`}>
                Detayı için tıklayınız...
            </Link>
        </li>
    )


}


export default QueteItem;