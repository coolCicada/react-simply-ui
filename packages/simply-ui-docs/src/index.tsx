import { componentSource as source } from './globalV';
import './index.less';

const components = import.meta.glob('./**/*.tsx', { eager: true });

const ComponentRenderer = () => {
    return (
        <div>
            {Object.entries(components).map(([path, module]: any) => {
                const Component = module.default;
                const key = path.slice(0, path.lastIndexOf('/'));
                return (
                    <div key={key} className="p-5">
                        {source[key]?.meta?.name}
                        <div className="p-4 my-4 border">
                            <Component />
                        </div>
                        <div className="whitespace-pre-wrap bg-slate-200 p-4 border">{source[key]?.content}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ComponentRenderer;
