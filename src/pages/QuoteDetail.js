import { Fragment, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import DetailQuote from "../components/quotes/DetailQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";


const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();
    const { quoteId } = params;

    const { sendRequest, status, data: loadedQuote, error } = useHttp(
        getSingleQuote,
        true
    )

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div>
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Fragment>
            <DetailQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={match.path} exact>
                <div>
                    <Link to={`${match.url}/comments`}>
                        Yorum Yükle
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>

    )

}

export default QuoteDetail;