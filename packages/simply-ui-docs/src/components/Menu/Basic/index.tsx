import { Menu, MenuItem, SumMenu } from 'react-simply-ui';

const index = () => {
    return (
        <Menu defaultSelectedId={["5", "1"]}>
            <SumMenu name="one" title="1">
                <MenuItem name="1">1-1</MenuItem>
            </SumMenu>
            <SumMenu name="two" title="2">
                <MenuItem name="2">2-1</MenuItem>
                <MenuItem name="3">2-2</MenuItem>
                <SumMenu name="three" title="3">
                    <MenuItem name="4">3-1</MenuItem>
                    <MenuItem name="5">3-2</MenuItem>
                </SumMenu>
            </SumMenu>
        </Menu>
    )
}

export default index