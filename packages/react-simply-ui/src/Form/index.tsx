import { createContext, ReactElement, useContext, cloneElement, useCallback, useState, useRef, useEffect, useMemo } from "react";
import { getObjValue, updateObjValue } from "../utils";
import cn from 'classnames';
import Schema from "async-validator";

const FormContext = createContext({} as any);

const Index = ({ form = { value: {}, addValidators: Function }, children }) => {
    const value = useRef(form.value);
    const onValueChange = useCallback((key, v) => {
        value.current = updateObjValue(value.current, key, v);
    }, [value]);

    return (
        <FormContext.Provider value={{ fv: value.current, onValueChange, addValidators: form.addValidators }}>
            {children}
        </FormContext.Provider>
    )
}

export default Index;

interface ItemProps {
    name: string;
    label: string;
    children: ReactElement;
    rules: Array<any>
}

function useFrom(value): any {
    const res = useRef(value);
    const getFieldsValue = useCallback(() => {
        return res.current;
    }, []);
    const setFieldByName = useCallback((name, value) => {
        res.current = updateObjValue(res, name, value);
    }, []);
    const getFieldByName = useCallback((name) => {
        return getObjValue(res.current, name);
    }, []);

    const validators = useRef(new Map<string, Function>());
    const addValidators = useCallback((name, fn) => {
        validators.current.set(name, fn);
    }, []);
    const validate = useCallback(async () => {
        const res: any = []
        for (const [k, v] of validators.current) {
            console.log('k', k, 'v:', v);
            const r = await v();
            if (r) {
                res.push({ field: k, error: r})
            }
        }
        return res;
    }, []);
    return {
        value: res.current,
        getFieldsValue,
        setFieldByName,
        getFieldByName,
        addValidators,
        validate
    }
}

Index.useForm = useFrom;

const Item: React.FC<ItemProps> = ({ children, name, label, rules }) => {
    const { fv, onValueChange, addValidators } = useContext(FormContext);
    const [value, setValue] = useState('');
    const [error, setError] = useState<string>('');

    const isErrors = useMemo(() => {
        return !!error;
    }, [error]);

    const handleValidate = useCallback(async () => {
        const schema = new Schema({
            [name]: rules.map(item => ({ ...item, type: 'string' }))
        });
        const v = { [name]: value };
        const error = await new Promise((resolve) => {
            schema.validate(v, err => resolve(err))
        })
        const res = error?.[0]?.message || '';
        setError(res);
        return res;
    }, [rules, value]);

    useEffect(() => {
        handleValidate();
        addValidators(name, handleValidate);
    }, [value, handleValidate]);

    useEffect(() => {
        setValue(getObjValue(fv, name) as any ?? '');
    }, []);
    const onChange = useCallback((e: any) => {
        setValue(e.target.value);
        onValueChange(name, e.target.value);
    }, [name]);
    return (
        <div className={cn('flex', 'gap-2')}>
            <div>{label}</div>
            <div>
                <div className={cn(isErrors ? 'border-red-600' : '', isErrors ? 'border' : '')}>
                    {cloneElement(children, { value, onChange })}
                </div>
                {error && <div className="text-red-600">
                    {error}
                </div>}
            </div>
        </div>
    )
}

Index.Item = Item;