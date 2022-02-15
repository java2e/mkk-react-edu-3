const FIREBASE_DOMAIN = 'https://mkk-react-edu-default-rtdb.firebaseio.com';


export async function getAllQuotes() {

    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Servisten veri cekilemedi!');
    }

    const transformedListe = [];

    for (const key in data) {
        const obj = {
            id: key,
            ...data[key],
        };

        transformedListe.push(obj);
    }

    return transformedListe;

}

export async function getSingleQuote(quoteId) {


    const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);

    debugger

    const data = await response.json();

    debugger
    if(!response.ok) {
        throw new Error(data.message || "data cekilemedi");
    }

    const loadedQuote = {
        id: quoteId,
        ...data
    }

    return loadedQuote;


}


export async function addQuote(quoteData) {

    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`,{
        method:'POST',
        body: JSON.stringify(quoteData),
        headers: {
            'Content-Type' :'application/json',
        },
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Veri eklenemedi!');
    }

    return null;

}


export async function addComment(requestData) {

    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,{
        method:'POST',
        body: JSON.stringify(requestData.commentData),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Yorum eklenemedi!');
    }

    return {commentId: data.name};

}

export async function getAllComments(quoteId) {

    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.message || 'Yorumlar cekilemedi!');
    }
 
    const transformedComments = [];
 
    for(const key in data){
        const obj = {
        id:key,
        ...data[key],
        }
        transformedComments.push(obj);
    }

    return transformedComments;

}