import {StyledItem, StyledList, StyledLogout, StyledSider} from "./styled";
import {lang} from "../../language/english";
import React from "react";

const Sidebar = (): JSX.Element => {
    return (
        <StyledSider>
            <StyledList>
                <StyledItem key="1">{lang.profile["profile"]}</StyledItem>
                {/*<StyledItem key="2">{lang.profile["profile"]}</StyledItem>*/}
                {/*<StyledItem key="3">{lang.profile["profile"]}</StyledItem>*/}
            </StyledList>
            <StyledLogout key="4">{lang.profile["logout"]}</StyledLogout>
        </StyledSider>
    )
}
export default Sidebar