import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {

    const { sendRequest, status, error } = useHttp(addComment);

    const commentInputRef = useRef();

    const { onAddedComment } = props;

    // arrow function
    useEffect(() => {

        if(status === 'completed' && !error) {
            onAddedComment();
        }

    },[status,error,onAddedComment])


    const submitFormHandler = (event) => {
        event.preventDefault();


        const textValue = commentInputRef.current.value;

        sendRequest({ commentData: { text: textValue }, quoteId: props.quoteId });

    }


    return (
        <form className={classes.form} onSubmit={submitFormHandler}>

            {status === 'pending' && (
                <div>
                    <LoadingSpinner />
                </div>
            )}


            <div className={classes.control}>
                <label htmlFor="comment">Yorum</label>
                <textarea id="comment" rows='5' ref={commentInputRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button className="btn">Yorum Ekle</button>
            </div>
        </form>

    )

}

export default NewCommentForm;