import { componentSource } from './globalV';
import './index.less';
const components = import.meta.glob(`./components/**/*.tsx`, { eager: true });

const ComponentRenderer = () => {
    return (
        <div>
            {Object.entries(components).map(([path, module]) => {
                const Component = (module as any).default;
                const nPath = path.split('./components')[1];
                return (
                    <div key={nPath}>
                        <div>{path}</div>
                        <div>
                            <Component />
                        </div>
                        <div className='whitespace-pre-wrap'>
                            {componentSource[nPath]}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ComponentRenderer;
