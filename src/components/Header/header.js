import React, { Component } from 'react';
import './Header.css'
import anchorIcom from '../../images/Anchor-icon.png'
import {Route,NavLink} from 'react-router-dom'
import Portfolio from '../../containers/Portfolio/Portfolio';
import UploadExcel from '../../containers/UploadExcel/UploadExcel';
import NavPage from '../../containers/Nav/NAVPage';
import Movements from '../../containers/Movements/Movements';
import ResearchPage from '../../containers/Research/ResearchPage';


class Header extends Component {
    state = {  }
    render() { 
        return (
            <div className="header_main">
                <ul className="header_ul">
                    <li className="header_li dropdown"><NavLink to={{pathname:"/Portfolio",search:'HTM-Leverage'}}>Portfolio</NavLink>
                        <div className="dropdown-content">
                        <NavLink to={{pathname:"/Portfolio",hash:'HTM-Leverage'}}>HTM-Leverage</NavLink>
                        <NavLink to={{pathname:"/Portfolio",hash:'HTM'}}>HTM</NavLink>
                        <NavLink to={{pathname:"/Portfolio",hash:'Active'}}>Active</NavLink>
                        </div>
                    </li>
                    <li className="header_li"><NavLink to="/NAV">Nav</NavLink></li>  
                    <li className="header_li"><NavLink to="/Movements">Movments</NavLink></li>
                    <li className="header_li"><NavLink to="/UploadExcel">Upload Excel</NavLink></li>
                    <li className="header_li"><NavLink to="/Research">Research</NavLink></li>
                    <li className="header_anchorIcon"><img src={anchorIcom} alt="anchorIcom"/></li>
                </ul>
            <Route path="/Portfolio" exact component={Portfolio}   />
            <Route path="/UploadExcel" exact component={UploadExcel}   />
            <Route path="/NAV" exact component={NavPage} />
            <Route path="/Movements" exact component={ Movements}   />
            <Route path="/Research" exact component={ ResearchPage}   />
            </div>

         );
    }
}
 
export default Header;