import React, { Component } from 'react';
import '../Css/Header.css'
import anchorIcom from '../../images/Anchor-icon.png'
import {Route,NavLink} from 'react-router-dom'
import Portfolio from '../../containers/Js/Portfolio';
import UploadExcel from '../../containers/Js/UploadExcel';
import NavPage from '../../containers/Js/NAVPage';
import Movements from '../../containers/Js/Movements';
import ResearchPage from '../../containers/Js/ResearchPage';
import Tzur from '../../containers/Js/Tzur';
import Auth from '../../containers/Js/Auth';
import {connect} from 'react-redux';
import * as portfolioActions from '../../store/actions/PortfolioActions'
import RepositoryPage from '../../containers/Js/RepositoryPage'
import TzurRepository from '../../containers/Js/TzurRepository'
class Header extends Component {
    state = {  }


    render() { 
        return (
            <React.Fragment>
            <div className="header_main">
                <ul className="header_ul">
                    <li className="header_li dropdown"><NavLink to={{pathname:"/Portfolio",search:'HTM-Leverage'}}>Portfolio</NavLink>
                        <div className="dropdown-content">
                        <NavLink to={{pathname:"/PortfolioHTML",hash:'HTM-Leverage'}}>HTM-Leverage</NavLink>
                        <NavLink to={{pathname:"/PortfolioHTM",hash:'HTM'}}>HTM</NavLink>
                        <NavLink to={{pathname:"/PortfolioACTIVE",hash:'Active'}}>Active</NavLink>
                        <NavLink to={{pathname:"/PortfolioHTMIG",hash:'IG'}}>IG</NavLink>
                        </div>
                    </li>
                    <li className="header_li"><NavLink to="/NAV">Nav</NavLink></li>  
                    <li className="header_li"><NavLink to="/Movements">Movments</NavLink></li>
                    <li className="header_li"><NavLink to="/UploadExcel">Upload Excel</NavLink></li>
                    <li className="header_li"><NavLink to="/Research">Research</NavLink></li>
                    <li className="header_li"><NavLink to="/Repository">CSAM Repository</NavLink></li>
                    <li className="header_li"><NavLink to="/Tzur">Tzur</NavLink></li>
                    <li className="header_li"><NavLink to="/TzurRepository">Tzur Repository</NavLink></li>
                    <li className="header_anchorIcon"><img src={anchorIcom} alt="anchorIcom"/></li>
                    <li className="header_li login"><NavLink to="/Auth">Login</NavLink></li>
                   
                </ul>
            <Route path="/PortfolioHTM" exact component={Portfolio}   />
            <Route path="/PortfolioHTML" exact component={Portfolio}   />
            <Route path="/PortfolioACTIVE" exact component={Portfolio}   />
            <Route path="/PortfolioHTMIG" exact component={Portfolio}   />
            <Route path="/UploadExcel" exact component={UploadExcel}   />
            <Route path="/NAV" exact component={NavPage} />
            <Route path="/Movements" exact component={ Movements}   />
            <Route path="/Research" exact component={ ResearchPage}   />
            <Route path="/Repository" exact component={ RepositoryPage}   />
            <Route path="/TzurRepository" exact component={ TzurRepository}   />
            <Route path="/Tzur" exact component={Tzur}   />
            <Route path="/Auth" exact component={Auth}   />
            </div>

          
            </React.Fragment>
         );
    }
}
 




export default Header;