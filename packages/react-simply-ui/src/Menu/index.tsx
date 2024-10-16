import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react"
import cn from 'classnames';
import './index.less';

interface ContextProps { selectId: string[]; setSelectId: Dispatch<SetStateAction<string[]>> }

const Context = createContext<ContextProps>({ selectId: [], setSelectId: () => {} });
const IdContext = createContext<any[]>([]);
const Index = ({ defaultSelectedId = [], children }: { defaultSelectedId : string[], children: ReactElement | ReactElement[]}) => {
    const [selectId, setSelectId] = useState<string[]>([]);
    useEffect(() => {
        setSelectId(defaultSelectedId);
    }, [defaultSelectedId])
    const [ids] = useState([]);
    return (
        <Context.Provider value={{ selectId, setSelectId }}>
            <IdContext.Provider value={ids}>
                -- {JSON.stringify(selectId)} --
                <div>{children}</div>
            </IdContext.Provider>
        </Context.Provider>
    )
}

export const MenuItem = ({ name = '?', children }) => {
    const { selectId, setSelectId } = useContext(Context);
    const ids = useContext(IdContext);
    const last = selectId[selectId.length - 1];
    useEffect(() => {
        if (name === last) {
            setSelectId([...ids, name]);
        }
    }, [last]);
    return (
        <div className="menu-item">
            <div className={cn({ selected: selectId.includes(name) })} onClick={() => setSelectId([...ids, name])}>
                {children} - ids: {JSON.stringify(ids)}
            </div>
        </div>
    )
}

export const SumMenu = ({ name = "", title = '', children }) => {
    const [open, setOpen] = useState(false);
    const ids = useContext(IdContext);
    const { selectId } = useContext(Context);
    const selected = selectId.includes(name);
    useEffect(() => {
        setOpen(selected);
    }, [selected]);
    return (
        <IdContext.Provider value={[...ids, name]}>
            <div className={cn('sub-menu')}>
                <div className={cn({ selected })}>{title}-----------<span onClick={() => setOpen(!open)}>here</span></div>
                <div className={cn('sub-menu-content', {'sub-menu-open': open })}>
                    {children}
                </div>
            </div>
        </IdContext.Provider>
    )
}

export default Index;