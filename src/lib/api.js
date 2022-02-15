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