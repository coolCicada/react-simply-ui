import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect } from 'react';

const CodeBlocks = ({ children }) => {
    useEffect(() => {
        hljs.highlightAll()
    }, []);
    return (
        <div className='codes'>{children}</div>
    )
}

export default CodeBlocks;