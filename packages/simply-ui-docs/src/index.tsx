import { componentSource as source } from './globalV';
import './index.less';
const PRE_FIX = './components';
const components = import.meta.glob(`./components/**/*.tsx`, { eager: true });

const ComponentRenderer = () => {
    const generateChildren = (sources, deep) => {
        return sources?.map(item => {
            if (item.type === 'dir') {
                return (
                    <div>
                        {generateChildren(item.children, deep + 1)}
                    </div>
                )
            } else if (item.type === 'tsx') {
                const path = PRE_FIX + item.key + '/' + item.name;
                const Component = (components[path] as any)?.default;
                return (
                    <div>
                        {<Component />}
                        <div className="whitespace-pre-wrap bg-slate-200 p-4 border my-2">{item.content}</div>
                    </div>
                )
            }
        })
    }
    return (
        <div>
            {generateChildren(source, 1)}
        </div>
    );
};

export default ComponentRenderer;
