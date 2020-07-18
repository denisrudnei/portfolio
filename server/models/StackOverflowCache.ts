import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

interface IStackOverflowCache extends Document {
  lastModifiedDate: Date;
  items: any[]
}

const StackOverflowCache = new Schema({
  lastModifiedDate: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  items: {
    type: Schema.Types.Mixed,
    default: [],
  },
});

export default mongoose.model<IStackOverflowCache>('StackOverflowCache', StackOverflowCache);
