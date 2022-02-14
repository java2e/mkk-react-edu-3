import { Fragment } from "react";
import QueteItem from "./QueteItem";

import { useHistory, useLocation } from 'react-router-dom';

import classes from './QueteList.module.css';

const sortQuotes = (quotes, ascending) => {
    return quotes.sort((qA, qB) => {
        if (ascending) {
            return qA.id > qB.id ? 1 : -1;
        }
        else {
            return qA.id < qB.id ? 1 : -1;
        }
    })
}


const QuotesList = (props) => {

    const history = useHistory();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const isSortingAscending = queryParams.get('sort') === 'asc';

    const sortedQuetes = sortQuotes(props.quotes, isSortingAscending);

    const changeSortingHandler = () => {
        history.push({
            pathName: location.pathname,
            search: `?sort=${(isSortingAscending ? 'desc' :'asc' )}`
        });
    }

    return (
        <Fragment>
            <div className={classes.sorting}>
                <button onClick={changeSortingHandler}>Sırala</button>
            </div>
            <ul className={classes.list}>
                {
                    sortedQuetes.map((quote) => (
                        <QueteItem
                            key={quote.id}
                            id={quote.id}
                            author={quote.author}
                            text={quote.text}
                        />
                    ))
                }
            </ul>


        </Fragment>
    )

}

export default QuotesList;