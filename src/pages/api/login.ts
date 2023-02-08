import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { query, body, method, headers } = req
    const params = { ...query, ...body }

    switch (method) {
        case 'POST':

            console.log(body);


            return res.status(200).json({ TOKEN: '123456' })

        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}