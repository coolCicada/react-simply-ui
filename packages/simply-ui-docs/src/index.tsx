import { componentSource } from './globalV';
import './index.less';
const components = import.meta.glob(`./components/**/*.tsx`, { eager: true });
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ComponentRenderer = () => {
    return (
        <div>
            {Object.entries(components).map(([path, module]) => {
                const Component = (module as any).default;
                let nPath = path.split('./components')[1]
                nPath = nPath.slice(0, nPath.lastIndexOf("/"));
                return (
                    <div key={nPath} className='space-y-4 my-8 p-4 border bg-gray-100'>
                        <div>{componentSource[nPath]?.info?.name}</div>
                        <div className='border p-2'>
                            <Component />
                        </div>
                        <SyntaxHighlighter language="javascript" style={solarizedlight}>
                            {componentSource[nPath]?.code}
                        </SyntaxHighlighter>
                    </div>
                )
            })}
        </div>
    );
};

export default ComponentRenderer;
