import React, { Component } from 'react';
import '../Css/Header.css'
import anchorIcom from '../../images/Anchor-icon.png'
import {Route,NavLink} from 'react-router-dom'
import Portfolio from '../../containers/Js/Portfolio';
import UploadExcel from '../../containers/Js/UploadExcel';
import NavPage from '../../containers/Js/NAVPage';
import Movements from '../../containers/Js/Movements';
import ResearchPage from '../../containers/Js/ResearchPage';
import {connect} from 'react-redux';
import * as portfolioActions from '../../store/actions/PortfolioActions'
import RepositoryPage from '../../containers/Js/RepositoryPage'

class Header extends Component {
    state = {  }
    render() { 
        return (
            <div className="header_main">
                <ul className="header_ul">
                    <li className="header_li dropdown"><NavLink to={{pathname:"/Portfolio",search:'HTM-Leverage'}}>Portfolio</NavLink>
                        <div className="dropdown-content">
                        <NavLink to={{pathname:"/PortfolioHTML",hash:'HTM-Leverage'}}>HTM-Leverage</NavLink>
                        <NavLink to={{pathname:"/PortfolioHTM",hash:'HTM'}}>HTM</NavLink>
                        <NavLink to={{pathname:"/PortfolioACTIVE",hash:'Active'}}>Active</NavLink>
                        </div>
                    </li>
                    <li className="header_li"><NavLink to="/NAV">Nav</NavLink></li>  
                    <li className="header_li"><NavLink to="/Movements">Movments</NavLink></li>
                    <li className="header_li"><NavLink to="/UploadExcel">Upload Excel</NavLink></li>
                    <li className="header_li"><NavLink to="/Research">Research</NavLink></li>
                    <li className="header_li"><NavLink to="/Repository">Report Repository</NavLink></li>
                    <li className="header_anchorIcon"><img src={anchorIcom} alt="anchorIcom"/></li>
                </ul>
            <Route path="/PortfolioHTM" exact component={Portfolio}   />
            <Route path="/PortfolioHTML" exact component={Portfolio}   />
            <Route path="/PortfolioACTIVE" exact component={Portfolio}   />
            <Route path="/UploadExcel" exact component={UploadExcel}   />
            <Route path="/NAV" exact component={NavPage} />
            <Route path="/Movements" exact component={ Movements}   />
            <Route path="/Research" exact component={ ResearchPage}   />
            <Route path="/Repository" exact component={ RepositoryPage}   />
            </div>

         );
    }
}
 


const mapDispatchToProps = dispatch =>
{
    return {
        // ChangePortfolioName: (portfolioName) => dispatch(portfolioActions.changePortfolioName(portfolioName))
    }
}

export default connect(null,mapDispatchToProps)(Header);