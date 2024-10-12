import { useEffect, useState } from "react";

const components = import.meta.glob('./**/*.tsx', { eager: true });

const ComponentRenderer = () => {
    const [source, setSource] = useState({});
    useEffect(() => {
        async function getComponentSource() {
            const res = await fetch('./component-sources.json');
            const json = await res.json();
            setSource(json);
        }
        getComponentSource();
        
    }, []);
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
