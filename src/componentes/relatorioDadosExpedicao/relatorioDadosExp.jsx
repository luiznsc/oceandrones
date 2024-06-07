import { React } from 'react';
import HeaderHomeUser from '../headerHomeUser/headerHomeUser';


export default function RelatorioDadosExp({dadosExpedicao}) {


    return (
        <>
            <HeaderHomeUser />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Data</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Destino</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Custo</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {dadosExpedicao.map((expedicao) => (
                        <tr key={expedicao.id}>
                        <td className="text-left py-3 px-4">{expedicao.id}</td>
                        <td className="text-left py-3 px-4">{expedicao.data}</td>
                        <td className="text-left py-3 px-4">{expedicao.destino}</td>
                        <td className="text-left py-3 px-4">{expedicao.custo}</td>
                        {/* ...outras células conforme necessário */}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
        </>
    )
}