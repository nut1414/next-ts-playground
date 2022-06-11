import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/db'
import PageState, { IPageState } from '../../../models/PageState' 


const options =  {
  upsert: true,
  new: true,
  setDefaultsOnInsert: true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPageState>
) {
  if (req.method === 'POST'){
    dbConnect()
    console.log('saving data')
    console.log(req.body)
    const state: IPageState = req.body || {
      time: 1635603431943,
      blocks: [
        {
          id: "12iM3lqzcm",
          type: "paragraph",
          data: {
            text:
              "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
          }
        }
      ]
    }

    const result: IPageState = await PageState.findOneAndUpdate({},state,options) || {} as IPageState

    res.status(200).json(result)
  }
}
  