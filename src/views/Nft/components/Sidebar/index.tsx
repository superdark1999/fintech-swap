import React from 'react'
import {SidebarStyled} from './styled.js'
interface SidebarProps {
    setShowSidebar:any;
    onShowSidebar:any;
}

const Sidebar: React.FC<SidebarProps> = ({setShowSidebar,onShowSidebar}) => {
    return (
        <SidebarStyled>
            <div onClick={()=>setShowSidebar(!onShowSidebar)}>Collapse</div>
        </SidebarStyled>
    )
}

export default Sidebar
