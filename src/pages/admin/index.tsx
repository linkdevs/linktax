import AdminHeader from '@root/components/AdminHeader';
import { Company } from '@root/services/types';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

const admin: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [companies, setCompanies] = useState<Company[]>([] as Company[]);
    const [company_form, setCompanyForm] = useState<Company>({} as Company);
    const [company_modal, toggleCompanyModal] = useState<boolean>(false);


    useEffect(() => {

        setCompanies([
            {
                id: 1,
                document: "123456789",
                name: "Loja 1",
                description: "Descrição da loja 1",
                ddns: "https://picsum.photos/200/300",
            }
        ])

    }, []);

    return <>
        <AdminHeader />

        <div className="container my-4">
            <div className="d-flex align-items-center border-bottom">
                <h1 className="py-2">Empresas</h1>
                <div className="ms-auto">
                    <button className="btn btn-primary" onClick={() => toggleCompanyModal(!company_modal)}><i className='fad fa-plus' /></button>
                </div>
            </div>

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">DDNS</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr>
                            <td>{company.name}</td>
                            <td>{company.description}</td>
                            <td>{company.ddns}</td>
                            <td className='d-flex gap-2'>
                                <button className="btn btn-primary"><i className='fas fa-edit' /></button>
                                <button className="btn btn-danger"><i className='fas fa-trash' /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {company_modal && <div className="modal show" style={{ display: 'block', backgroundColor: "rgba(0,0,0,.4)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Nova empresa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => toggleCompanyModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="document" className="form-label">CNPJ</label>
                                    <input type="text" className="form-control" id="document" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Fantasia</label>
                                    <input type="text" className="form-control" id="fancyname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descrição</label>
                                    <input type="text" className="form-control" id="description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ddns" className="form-label">DDNS</label>
                                    <input type="text" className="form-control" id="ddns" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => toggleCompanyModal(false)}>Fechar</button>
                            <button type="button" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </>;
}

export default admin;