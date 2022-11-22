import "./MenuLateral.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
  CDBIcon,
  CDBBadge
} from "cdbreact";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function MenuLateral() {
  return (

    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
      <CDBSidebarHeader  prefix={<CDBIcon icon="bars" size="lg" />}>
        Questões            
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem 
           suffix={
            <CDBBadge color="orange" size="small" borderType="pill">
                130
            </CDBBadge>
            }
            icon="tags"
          >
          Tags
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem 
            suffix={
            <CDBBadge color="#FF851B" size="small" borderType="pill">
                70
            </CDBBadge>
            }
            icon="user"
          >
          Usuários
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem 
            suffix={
            <CDBBadge color="#01FF70" size="small" borderType="pill">
                50
            </CDBBadge>
            }
          icon="city"
          >
          Órgãos
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>

      </CDBSidebarFooter>
    </CDBSidebar>
  );
}

export default MenuLateral;


// <CDBSidebarHeader prefix={<CDBIcon icon="bars" size="lg" />}>
// With Badges
// </CDBSidebarHeader>
// <CDBSidebarContent>
// <CDBSidebarMenu>
//   <CDBSidebarMenuItem
//     suffix={
//       <CDBBadge color="danger" size="small" borderType="pill">
//         pro
//       </CDBBadge>
//     }
//     icon="th-large"
//   >
//     Dashboard
//   </CDBSidebarMenuItem>
//   <CDBSidebarMenuItem icon="sticky-note" suffix={<CDBBadge>4</CDBBadge>}>
//     Components
//   </CDBSidebarMenuItem>
// </CDBSidebarMenu>
// </CDBSidebarContent>
// <CDBSidebarFooter style={{ textAlign: 'center' }}>
// <div
//   className="sidebar-btn-wrapper"
//   style={{ padding: '20px 5px'}}
// >
//   Sidebar Footer
// </div>
// </CDBSidebarFooter>
// </CDBSidebar>