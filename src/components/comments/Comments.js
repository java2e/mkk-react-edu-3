import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

import classes from './Comments.module.css';


const Comments = () => {

    const [isAddedComment, setIsAddedComment] = useState(false);

    const params = useParams();

    const { quoteId } = params;  // react router dom 

    const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

    useEffect(() => {
        sendRequest(quoteId);
    }, [quoteId, sendRequest])

    const addedCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    const startAddCommentHandler = () => {
        setIsAddedComment(true);
    }

    let comments;

    if (status === 'pending') {
        comments = (
            <div>
                <LoadingSpinner />
            </div>
        )
    }


    if (status === 'completed' && loadedComments && loadedComments.length > 0) {
        comments = <CommentsList comments={loadedComments} />;
    }


    if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
        comments = <p>Yorum Yok! Halen eklenmemiş</p>
    }


    return (
        <section className={classes.comments}>
            <h2>Kullanıcı Yorumları</h2>

            {!isAddedComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Yorum Ekle
                </button>
            )}
            {isAddedComment && (
                <NewCommentForm
                    quoteId={quoteId}
                    onAddedComment={addedCommentHandler}
                />
            )}
            {comments}
        </section>

    )

}

export default Comments;