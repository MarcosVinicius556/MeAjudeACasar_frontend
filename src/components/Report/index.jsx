import './report.css';
import logo from '../../assets/icon.png';
import formatDate from '../../utils/DateFormatter';
import React from 'react';

const getStatusColor = (status) => {
    switch(status) {
        case 'DISPONIVEL': 
            return '#B2F6A6';
        case 'OBSERVADO': 
            return '#f8cb90';
        case 'COMPRADO': 
            return '#ffa29c';
    }
}

export default class PrintComponent extends React.Component {
    render() {
        return(
            <div className="report-container">
                <div className='report-header'>
                    <img src={logo} alt="" />
                    <h1>Lista de Presentes</h1>
                </div>
                <div className="report-content">
                    <table className="report-table">
                        <thead>
                            <tr>
                                <td>NOME</td>
                                <td>DESCRIÇÃO</td>
                                <td>VALOR</td>
                                <td>SITUAÇÃO</td>
                            </tr>
                        </thead>
                        
                        <tbody>
                            
                            {this.props.content && this.props.content.length != 0
                                ? this.props.content.map((gift) => (
                                    <tr key={gift._id}>
                                        <td>{gift.name}</td>
                                        <td>
                                            {
                                                gift.description.length > 20 
                                                    ? `${gift.description.substring(0, 37)}...` 
                                                    : gift.description}
                                        </td>
                                        <td>R$ {gift.average_values}</td>
                                        <td>
                                            <span style={{ background: getStatusColor(gift.status) }}>
                                                {gift.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td>Nenhum Registro encontrado!</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                        
                    </table>
                </div>
                <div className='report-footer'>
                    <h3>Data de geração do relatório {formatDate(Date.now())}</h3>
                </div>
            </div>
        );
    }
}
