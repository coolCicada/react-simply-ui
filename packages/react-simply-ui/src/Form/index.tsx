import { createContext, ReactElement, useContext, cloneElement, useCallback, useState, useRef, useEffect } from "react";
import { getObjValue, updateObjValue } from "../utils";

const FormContext = createContext({} as any);

const Index = ({ form = { value: {}}, children }) => {
    const value = useRef(form.value);
    const onValueChange = useCallback((key, v) => {
        value.current = updateObjValue(value.current, key, v);
    }, [value]);
    return (
        <FormContext.Provider value={{ fv: value.current, onValueChange }}>
            {children}
        </FormContext.Provider>
    )
}

export default Index;

interface ItemProps {
    name: string;
    children: ReactElement
}

function useFrom(value) {
    const res = useRef(value);
    const getFieldsValue = useCallback(() => {
        return res.current;
    }, []);
    const setFieldByName = useCallback((name, value) => {
        res.current = updateObjValue(res, name, value);
    }, []);
    const getFieldByName = useCallback((name) => {
        return getObjValue(res.current, name);
    }, [])
    return {
        value: res.current,
        getFieldsValue,
        setFieldByName,
        getFieldByName
    }
}

Index.useForm = useFrom;

const Item: React.FC<ItemProps> = ({ children, name }) => {
    const { fv, onValueChange } = useContext(FormContext);
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(getObjValue(fv, name) as any ?? '');
    }, []);
    const onChange = useCallback((e: any) => {
        setValue(e.target.value);
        onValueChange(name, e.target.value);
    }, [name]);
    return (
        <div>
            {cloneElement(children, { value, onChange })}
        </div>
    )
}

Index.Item = Item;