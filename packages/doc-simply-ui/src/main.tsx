import './main.less';
import './markdown.css';
import First from './First.mdx';

const App = () => {
    return (
        <div className='ls-only min-h-screen overflow-auto px-3'>
            <div className="markdown-body">
                <First />
            </div>
        </div>
    )
}

export default App;
