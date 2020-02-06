import React, { Component } from 'react';




class TzurReport extends Component {
    state = {  }



    amountByAcountNum=(acountNum,reportType)=>{
        console.log("the month is: "+this.props.month);
        let month = this.props.month;
        let year = this.props.year;
        let tzurArray = this.props.tzurArray;
        let amount = 0;
        tzurArray.filter(a=>{return (a.reportType === reportType
                                    && a.acountNum === acountNum 
                                    && a.month === Number(month) 
                                    && a.year === Number(year))}).map(r=>{
            amount += r.changeAmont;
        });
        return amount;
    }



    render() { 
        return ( 
            <table className='table table-hover' id="tzurTable" style={{padding:'2%',width:"70%",marginLeft:"15%"}}>
                <thead >
                    <tr style={{backgroundColor:"rgb(10, 75, 136)"}}>
                        <th>Acount Group</th>
                        <th>Acount Num</th>
                        <th>Acount Description</th>
                        <th>Source Active</th>
                        <th>Source HTM</th>
                        <th>Source HTM-Leverage</th>
                        <th>Source Cash</th>
                        <th>Source Entire</th>
                        <th>Month</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Interest Income</td>
                        <td>61000</td>
                        <td>Fixed Income Interest</td>
                        <td>{ this.amountByAcountNum("61000","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61000","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61000","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61000","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61000","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                    </tr>
                    <tr>
                        <td>M t M - Unrealized</td>
                        <td>46020</td>
                        <td>Unrealized Inventory Security Gain/Loss</td>
                        <td>{ this.amountByAcountNum("46020","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46020","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46020","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46020","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46020","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                    </tr>
                    <tr>
                        <td>Realized Capital Gain/Loss</td>
                        <td>56020</td>
                        <td>Realized Inventory Security Gain/Loss</td>
                        <td>{ this.amountByAcountNum("56020","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("56020","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("56020","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("56020","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("56020","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Realized Capital Gain/Loss</td>
                        <td>57020</td>
                        <td>Realized Inventory Security Gain/Loss</td>
                        <td>{ this.amountByAcountNum("57020","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57020","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57020","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57020","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57020","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Interest Expense</td>
                        <td>61200</td>
                        <td>Rebate Interest</td>
                        <td>{ this.amountByAcountNum("61200","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61200","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61200","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61200","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61200","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Interest Expense</td>
                        <td>61300</td>
                        <td>Margin Interest</td>
                        <td>{ this.amountByAcountNum("61300","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61300","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61300","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61300","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61300","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Interest Expense</td>
                        <td>61500</td>
                        <td>Bank Debt Finance Interest</td>
                        <td>{ this.amountByAcountNum("61500","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61500","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61500","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61500","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("61500","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Bank Interest Income</td>
                        <td>72000</td>
                        <td>Interest Income</td>
                        <td>{ this.amountByAcountNum("72000","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72000","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72000","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72000","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72000","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>CSAM</td>
                        <td>64200</td>
                        <td>Professional Fees</td>
                        <td>{ this.amountByAcountNum("64200","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64200","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64200","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64200","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64200","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Insurance Expense</td>
                        <td>72004</td>
                        <td>Insurance Expense</td>
                        <td>{ this.amountByAcountNum("72004","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72004","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72004","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72004","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("72004","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Credit Loss Allowance 0.12%</td>
                        <td>65900</td>
                        <td>Credit Loss Allowance 0.12%</td>
                        <td>{ this.amountByAcountNum("65900","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("65900","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("65900","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("65900","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("65900","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Management</td>
                        <td>64000</td>
                        <td>Management Fees</td>
                        <td>{ this.amountByAcountNum("64000","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64000","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64000","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64000","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64000","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Misc.</td>
                        <td>62700</td>
                        <td>Accounting/Audit Fees</td>
                        <td>{ this.amountByAcountNum("62700","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62700","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62700","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62700","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62700","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Misc.</td>
                        <td>64300</td>
                        <td>Clearing Fees</td>
                        <td>{ this.amountByAcountNum("64300","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64300","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64300","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64300","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64300","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Misc.</td>
                        <td>64900</td>
                        <td>Other Fees</td>
                        <td>{ this.amountByAcountNum("64900","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64900","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64900","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64900","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("64900","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Misc.</td>
                        <td>68111</td>
                        <td>FATCA/CRS Service Fee</td>
                        <td>{ this.amountByAcountNum("68111","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("68111","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("68111","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("68111","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("68111","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Misc.</td>
                        <td>71000</td>
                        <td>Rebate Due from GP</td>
                        <td>{ this.amountByAcountNum("71000","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Set Up</td>
                        <td>62200</td>
                        <td>Organizational Cost</td>
                        <td>{ this.amountByAcountNum("62200","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62200","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62200","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62200","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62200","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Tzur</td>
                        <td>62300</td>
                        <td>Administrative Fees</td>
                        <td>{ this.amountByAcountNum("62300","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62300","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62300","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62300","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("62300","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Misc.</td>
                        <td>71000</td>
                        <td>Rebate Due from GP</td>
                        <td>{ this.amountByAcountNum("71000","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("71000","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Unrealized FX</td>
                        <td>47030</td>
                        <td>Unrealized Off Bal FX Gain/Loss</td>
                        <td>{ this.amountByAcountNum("47030","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47030","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47030","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47030","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47030","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>Unrealized FX</td>
                        <td>47130</td>
                        <td>Unrealized Off bal Contra Inv FX Gain\Loss</td>
                        <td>{ this.amountByAcountNum("47130","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47130","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47130","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47130","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47130","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>40030</td>
                        <td>Unrealized Cash FX Gain/Loss</td>
                        <td>{ this.amountByAcountNum("40030","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("40030","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("40030","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("40030","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("40030","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>41030</td>
                        <td>Unrealized Accrued Fixed Income Interest FX Gain/L</td>
                        <td>{ this.amountByAcountNum("41030","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("41030","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("41030","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("41030","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("41030","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>42830</td>
                        <td>Unrealized Accrued Tax fees FX Gain/Loss</td>
                        <td>{ this.amountByAcountNum("42830","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("42830","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("42830","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("42830","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("42830","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>45930</td>
                        <td>Unrealized Accrued Other Income/Expense FX Gain\Lo</td>
                        <td>{ this.amountByAcountNum("45930","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("45930","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("45930","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("45930","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("45930","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>46030</td>
                        <td>Unrealized Inventory FX Gain/Loss</td>
                        <td>{ this.amountByAcountNum("46030","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46030","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46030","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46030","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("46030","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>47020</td>
                        <td>Unrealized Off Bal Security Gain/Loss</td>
                        <td>{ this.amountByAcountNum("47020","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47020","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47020","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47020","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("47020","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>50030</td>
                        <td>Realized Cash FX Gain/Loss</td>
                        <td>{ this.amountByAcountNum("50030","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("50030","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("50030","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("50030","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("50030","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>51030</td>
                        <td>Realized Accrued Fixed Income Interest FX Gain/Los</td>
                        <td>{ this.amountByAcountNum("51030","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("51030","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("51030","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("51030","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("51030","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>57030</td>
                        <td>Realized Off Bal FX Gain/Loss</td>
                        <td>{ this.amountByAcountNum("57030","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57030","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57030","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57030","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57030","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>57130</td>
                        <td>Realized Off bal Contra Inv FX Gain\Loss</td>
                        <td>{ this.amountByAcountNum("57130","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57130","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57130","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57130","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("57130","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    <tr>
                        <td>FX Hedge</td>
                        <td>59930</td>
                        <td>Realized Client Specific Accts FX Gain/Loss</td>
                        <td>{ this.amountByAcountNum("59930","Active").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("59930","HTM").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("59930","HTM-Leverage").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("59930","cash").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{ this.amountByAcountNum("59930","entire").toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{this.props.month}</td>
                        <td>{this.props.year}</td>
                        </tr>
                    
                </tbody>
            </table>
         );
    }
}
 
export default TzurReport;