import React, { useEffect, useState } from 'react';

interface Quote {
    text: string;
    author: string;
}

const QuoteFetcher: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await fetch('https://type.fit/api/quotes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setQuotes(result);
                setRandomQuote(result[Math.floor(Math.random() * result.length)]);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    const handleNewQuote = () => {
        if (quotes.length > 0) {
            setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }
    };

    useEffect(() => {
        const handleScreenClick = () => {
            if (quotes.length > 0) {
                setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
            }
        };

        document.addEventListener('click', handleScreenClick);

        return () => {
            document.removeEventListener('click', handleScreenClick);
        };
    }, [quotes]);

    const cleanAuthor = (author: string) => {
        return author.replace(', type.fit', '');
    };

    return (
        <div className='w-84 h-44 bg-white rounded-xl flex flex-col items-center justify-center h-screen p-6'>
            <h1 className='font-bold'>Random Quote</h1>
            {randomQuote && (
                <div>
                    <p className='text-center'>"{randomQuote.text}"</p>
                    <p className='italic text-center'>- {randomQuote.author ? cleanAuthor(randomQuote.author) : 'Unknown'}</p>
                </div>
            )}
        </div>
    );
};

export default QuoteFetcher;