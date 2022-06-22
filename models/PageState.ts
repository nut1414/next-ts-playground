import mongoose from 'mongoose'

export interface IBlock {
  id: string,
  type: string,
  data: object
}

export interface IPageState {
  time: number
  blocks: IBlock[]
  version: string
}

const pageStateSchema = new mongoose.Schema<IPageState>({
  time: { type: Number },
  blocks: [{ id: { type: String }, 'type': { type: String }, data: { type: Object } }],
  version: { type: String }
})

export default mongoose.models.PageState || mongoose.model<IPageState>('PageState', pageStateSchema)