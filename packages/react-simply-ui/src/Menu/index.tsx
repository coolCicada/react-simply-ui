import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react"
import cn from 'classnames';
import './index.less';

interface ContextProps {
    selectId: string[];
    setSelectId: Dispatch<SetStateAction<string[]>>;
    paths: string[];
    setPaths: Dispatch<SetStateAction<string[]>>;
}

const Context = createContext<ContextProps>({ selectId: [], setSelectId: () => { }, paths: [], setPaths: () => {} });
const IdContext = createContext<any[]>([]);
const Index = ({ defaultSelectedId = [], children }: { defaultSelectedId: string[], children: ReactElement | ReactElement[] }) => {
    const [selectId, setSelectId] = useState<string[]>([]);
    const [paths, setPaths] = useState<string[]>([]);
    useEffect(() => {
        setSelectId(defaultSelectedId);
    }, [defaultSelectedId])
    const [ids] = useState([]);
    return (
        <Context.Provider value={{ selectId, setSelectId, paths, setPaths }}>
            <IdContext.Provider value={ids}>
                -- {JSON.stringify(paths)} --
                <div>{children}</div>
            </IdContext.Provider>
        </Context.Provider>
    )
}

export const MenuItem = ({ name = '?', children }) => {
    const { selectId, setSelectId, setPaths } = useContext(Context);
    const ids = useContext(IdContext);
    useEffect(() => {
        if (selectId.includes(name)) {
            setPaths(pre => {
                console.log('pre:', pre);
                return [...pre, ...ids]
            });
        }
    }, [selectId]);
    return (
        <div className="menu-item">
            <div className={cn({ selected: selectId.includes(name) })} onClick={() => {
                setPaths([]);
                setSelectId([name])
            }}>
                {children} - ids: {JSON.stringify(ids)}
            </div>
        </div>
    )
}

export const SumMenu = ({ name = "", title = '', children }) => {
    const [open, setOpen] = useState(false);
    const ids = useContext(IdContext);
    const { paths } = useContext(Context);
    const selected = paths.includes(name);
    useEffect(() => {
        if (!open) setOpen(selected);
    }, [paths]);
    return (
        <IdContext.Provider value={[...ids, name]}>
            <div className={cn('sub-menu')}>
                <div className={cn({ selected })}>{title}-----------<span onClick={() => setOpen(!open)}>here</span></div>
                <div className={cn('sub-menu-content', { 'sub-menu-open': open })}>
                    {children}
                </div>
            </div>
        </IdContext.Provider>
    )
}

export default Index;